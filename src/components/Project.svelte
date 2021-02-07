<script>
	import { createEventDispatcher } from "svelte";
	import { currProject, projects } from "../stores";
	import { fade } from "svelte/transition";

	export let project;

	const dispatch = createEventDispatcher();

	function onSelect() {
		dispatch("select", project);
	}

	function onRemove() {
		dispatch("remove", project);
	}

	let hovering = false;

	function activeHover() {
		hovering = true;
	}
	function inactiveHover() {
		hovering = false;
	}
</script>

<div
	class="project center-full {project.id == $currProject ? 'active' : ''}"
	style="--background-color: {project.design};"
	on:click={onSelect}
	on:mouseenter={activeHover}
	on:mouseleave={inactiveHover}
>
	<slot name="name">
		<span class="missing">Project</span>
	</slot>
	{#if project.id && hovering}
		<button type="button" class="project-del-btn" on:click={onRemove}>
			<i class="fas fa-trash-alt" />
		</button>
	{/if}
</div>
