<script>
	import "normalize.css";
	import Graphs from "./components/Graphs.svelte";
	import PomodoroClock from "./components/PomodoroClock.svelte";
	import ProgressIcons from "./components/ProgressIcons.svelte";
	import ProjectPanel from "./components/ProjectPanel.svelte";
	import Settings from "./components/Settings.svelte";
	import TimeDate from "./components/TimeDate.svelte";
	import ToDoList from "./components/ToDoList.svelte";

	import { todos, projects } from "./stores.js";
</script>

<Settings />
<ProgressIcons />
<Graphs />

<ProjectPanel bind:projects={$projects} />
<TimeDate />

<div class="container center-full pos-abs">
	<PomodoroClock />
	<ToDoList bind:todos={$todos} />
</div>
