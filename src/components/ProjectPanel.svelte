<script>
	import { fly } from "svelte/transition";
	import { quadOut, sineOut } from 'svelte/easing';

	let showPanel = false;

	function togglePanel() {
		showPanel = !showPanel;
	}
</script>

<div id="project-panel" class="pos-fixed center-full">
	<div id="panel-open" class="center-full {showPanel ? 'open' : ''}" on:click={togglePanel}>
		<i class="fas fa-angle-left" />
	</div>
	{#if showPanel}
		<ul id="panel-list" role="list" transition:fly={{ x: 200, opacity: 1, duration: 400, easing: sineOut }}>
			<li class="project">
				<span>Quick Tasks</span>
			</li>
		</ul>
	{/if}
</div>
