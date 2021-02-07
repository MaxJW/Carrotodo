<script>
	import { fly } from "svelte/transition";
	import { sineOut } from "svelte/easing";
	import { clickOutside } from "../utils.js";
	import { currProject } from "../stores.js";
	import Project from "./Project.svelte";
	import NewProject from "./NewProject.svelte";

	export let projects = [];
	export let todos = [];

	let showPanel = false; //Track if project panel is open or closed

	function togglePanel() {
		showPanel = !showPanel;
	}

	function hidePanel() {
		showPanel = false;
	}

	$: newProjectId = projects.length
		? Math.max(...projects.map((p) => p.id)) + 1
		: 1; //Generate new project ID on new project creation

	function addProject(newProj) {
		projects = [
			...projects,
			{ id: newProjectId, name: newProj.pname, design: newProj.pdesign },
		];
	}

	function removeProject(project) {
		if (projects.length > 1) {
			projects = projects.filter((p) => p.id !== project.id);
			todos = todos.filter((t) => t.project !== project.id);
			changeProject(projects[0]);
		}
	}

	//Update project name/colour on edit (currently not implemented)
	function updateProject(project) {
		const i = projects.findIndex((p) => p.id === project.id);
		projects[i] = { ...projects[i], ...project };
	}

	//Change which project is currently being worked from, updates ToDo list
	function changeProject(project) {
		if ($currProject != project.id) {
			$currProject = project.id;
		}
	}
</script>

<div
	id="project-panel"
	class="pos-fixed center-full"
	use:clickOutside
	on:click_outside={hidePanel}
>
	<div
		id="panel-open"
		class="center-full"
		class:open={showPanel}
		on:click={togglePanel}
	>
		<i class="fas fa-angle-left pos-abs" />
	</div>
	{#if showPanel}
		<div
			id="panel-list"
			transition:fly={{
				x: 240,
				opacity: 1,
				duration: 400,
				easing: sineOut,
			}}
		>
			{#each projects as project (project.id)}
				<Project
					{project}
					on:select={(e) => changeProject(e.detail)}
					on:update={(e) => updateProject(e.detail)}
					on:remove={(e) => removeProject(e.detail)}
				>
					<span slot="name">{project.name}</span>
				</Project>
			{/each}
			<NewProject on:add={(e) => addProject(e.detail)} />
		</div>
	{/if}
</div>

<style>
	#project-panel {
		right: 0;
		height: 100%;
		z-index: 99;
	}

	#panel-list {
		background-color: #161f27;
		position: fixed;
		height: 100%;
		margin: 0;
		padding: 0;
		width: 230px;
		right: 0;
		padding: 10px;
		overflow-y: scroll;
		z-index: 5;
		display: flex;
		flex-direction: column;
		padding-top: 30px;
	}

	#panel-open {
		padding-right: var(--body-padding);
		border-bottom-left-radius: 4em;
		border-top-left-radius: 4em;
		height: 4em;
		width: 1.5em;
		z-index: 5;
		background: #161f27;
		font-size: 1.5em;
		align-items: flex-end;
		position: fixed;
		right: 0;
		cursor: pointer;
		transition: right 390ms ease-out;
	}

	#panel-open:hover .fa-angle-left {
		margin-right: 5px;
	}

	#panel-open.open {
		right: 235px;
	}

	#panel-open.open .fa-angle-left {
		transform: rotate(180deg);
	}

	.fa-angle-left {
		transition: margin-right 100ms ease-out;
	}
</style>
