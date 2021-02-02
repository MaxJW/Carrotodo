<script>
	import "normalize.css";
	import Graphs from "./components/Graphs.svelte";
	import PomodoroClock from "./components/PomodoroClock.svelte";
	import ProgressIcons from "./components/ProgressIcons.svelte";
	import ProjectPanel from "./components/ProjectPanel.svelte";
	import Settings from "./components/Settings.svelte";
	import TimeDate from "./components/TimeDate.svelte";
</script>

<Settings />
<ProgressIcons />
<Graphs />

<ProjectPanel />
<TimeDate />

<!-- ToDo List -->
<div class="container center-full pos-fixed">
	<PomodoroClock />
	<div class="todo-list">
		<div class="todo-item">
			<input id="1" type="checkbox" class="todo-check" />
			<label for="1" class="todo-label">This is a sample todo</label>
		</div>
		<div class="new-todo">
			<input id="2" type="checkbox" class="todo-check" />
			<label for="2" class="todo-label">Add new todo</label>
		</div>
	</div>
</div>
