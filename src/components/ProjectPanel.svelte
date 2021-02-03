<script>
	import { fly } from "svelte/transition";
	import { sineOut } from "svelte/easing";
	import Project from "./Project.svelte";
	import { currProject } from "../stores.js";

	export let projects = [];

	let showPanel = false;

	function togglePanel() {
		showPanel = !showPanel;
	}
</script>

<div id="project-panel" class="pos-fixed center-full">
	<div
		id="panel-open"
		class="center-full {showPanel ? 'open' : ''}"
		on:click={togglePanel}
	>
		<i class="fas fa-angle-left" />
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
					on:click={() => currProject.update((n) => project.id)}
				>
					<span slot="name">{project.name}</span>
				</Project>
			{/each}
		</ul>
	{/if}
</div>
