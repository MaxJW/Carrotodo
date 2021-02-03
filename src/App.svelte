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
	<div id="todo-list" class="center-full">
		<div class="todo-item">
			<input id="1" type="checkbox" class="todo-check" />
			<label for="1" class="todo-label">This is a sample todo</label>
		</div>
		<div class="todo-item">
			<input id="2" type="checkbox" class="todo-check" />
			<label for="2" class="todo-label">And another one</label>
		</div>
		<div class="todo-item">
			<input id="3" type="checkbox" class="todo-check" />
			<label for="3" class="todo-label">Here is another todo</label>
		</div>
		<div class="new-todo">
			<i class="fas fa-plus todo-check"></i>
			<label for="2" class="todo-label new">Add new todo</label>
		</div>
	</div>
</div>
