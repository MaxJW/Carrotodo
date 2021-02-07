<script>
	import { fly } from "svelte/transition";
	import { sineOut } from "svelte/easing";
	import Project from "./Project.svelte";
	import { currProject } from "../stores.js";
	import NewProject from "./NewProject.svelte";
	import { clickOutside } from "../utils.js";

	export let projects = [];
	export let todos = [];

	let showPanel = false;

	function togglePanel() {
		showPanel = !showPanel;
	}

	function hidePanel() {
		showPanel = false;
	}

	$: newProjectId = projects.length
		? Math.max(...projects.map((p) => p.id)) + 1
		: 1;

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

	function updateProject(project) {
		const i = projects.findIndex((p) => p.id === project.id);
		projects[i] = { ...projects[i], ...project };
	}

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
		class="center-full {showPanel ? 'open' : ''}"
		on:click={togglePanel}
	>
		<i class="fas fa-angle-left pos-abs" />
	</div>
	{#if showPanel}
		<ul
			id="panel-list"
			role="list"
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
		</ul>
	{/if}
</div>
