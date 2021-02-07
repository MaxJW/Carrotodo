<script>
	import "normalize.css";
	import PomodoroClock from "./components/PomodoroClock.svelte";
	import ProgressIcons from "./components/ProgressIcons.svelte";
	import ProjectPanel from "./components/ProjectPanel.svelte";
	import Settings from "./components/Settings.svelte";
	import TimeDate from "./components/TimeDate.svelte";
	import ToDoList from "./components/ToDoList.svelte";
	import { tweened } from 'svelte/motion'
	import { todos, projects } from "./stores.js";

	let percentTimeRemaining = 100;
	const progress = tweened(0, { duration: 1000 })
	$: $progress = percentTimeRemaining;

	let currDesign;
</script>

<Settings />
<ProgressIcons />

<ProjectPanel bind:projects={$projects} bind:todos={$todos} />
<TimeDate />

<div class="container center-full pos-abs" style="--percent-remaining: {$progress}%; --current-timer-colour: {currDesign}cc;">
	<PomodoroClock bind:percentTimeRemaining={percentTimeRemaining} bind:currDesign={currDesign} />
	<ToDoList bind:todos={$todos} />
</div>
