<script>
	import { createEventDispatcher } from "svelte";
	
	export let project;

	const dispatch = createEventDispatcher();

	function onSelect() {
        dispatch("select", todo); // emit remove event
    }
</script>

<div id="project-{project.id}" class="project center-full" style="--background-color: {project.design}">
	<slot name="name">
		<span class="missing">Project</span>
	</slot>
</div>

<style>
	.project {
		background-color: var(--background-color);
		border-radius: 15px;
		min-height: 7em;
		width: 100%;
		margin-bottom: 10px
	}
</style>
