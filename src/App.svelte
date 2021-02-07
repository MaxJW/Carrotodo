<script>
	import "normalize.css"; //Normalize CSS elements - https://necolas.github.io/normalize.css/
	//Import components
	import PomodoroClock from "./components/PomodoroClock.svelte";
	import ProgressIcons from "./components/ProgressIcons.svelte";
	import ProjectPanel from "./components/ProjectPanel.svelte";
	import Settings from "./components/Settings.svelte";
	import TimeDate from "./components/TimeDate.svelte";
	import ToDoList from "./components/ToDoList.svelte";
	import { tweened } from "svelte/motion"; //Import svelte tween library
	import { todos, projects } from "./stores.js"; //Import required stores

	//Used to store percentage of time remaining in timer to fill background colour appropriately
	let percentTimeRemaining = 100;
	const progress = tweened(0, { duration: 1000 });
	$: $progress = percentTimeRemaining;

	let currTimer = {}; //Store current timer details (specifically ID and colour)
</script>

<Settings />
<ProgressIcons {currTimer} />

<ProjectPanel bind:projects={$projects} bind:todos={$todos} />
<TimeDate />

<div
	class="container center-full pos-abs"
	style="--percent-remaining: {$progress}%; --current-timer-colour: {currTimer.design}cc;"
>
	<PomodoroClock bind:percentTimeRemaining bind:currTimer />
	<ToDoList bind:todos={$todos} />
</div>

<style>
	.container {
		min-height: 100%;
		width: 100%;
		z-index: -1;
		background: linear-gradient(
			180deg,
			rgb(32 43 56 / 80%) var(--percent-remaining),
			var(--current-timer-colour) var(--percent-remaining)
		);
	}
</style>
