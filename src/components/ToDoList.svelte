<script>
    import NewTodo from "./NewTodo.svelte";
    import Todo from "./Todo.svelte";
    import { currProject } from "../stores.js";
    import { flip } from "svelte/animate";
    import { dndzone } from "svelte-dnd-action";

    export let todos = [];

    $: newTodoId = todos.length ? Math.max(...todos.map((t) => t.id)) + 1 : 1;

    function addTodo(name) {
        todos = [
            ...todos,
            { id: newTodoId, name, completed: false, project: $currProject },
        ];
    }

    function removeTodo(todo) {
        todos = todos.filter((t) => t.id !== todo.id);
    }

    function updateTodo(todo) {
        const i = todos.findIndex((t) => t.id === todo.id);
        todos[i] = { ...todos[i], ...todo };
    }

    function handleSort(e) {
        todos = e.detail.items;
    }
</script>

<div id="todo-list" class="center-full">
    <div
        id="todo-container"
        use:dndzone={{
            items: todos,
            dropTargetStyle: {
                "box-shadow": "0 0 0 2px #0096bfab",
                "border-radius": "6px",
            },
        }}
        on:consider={handleSort}
        on:finalize={handleSort}
    >
        {#each todos as todo (todo.id)}
            <Todo
                {todo}
                on:update={(e) => updateTodo(e.detail)}
                on:remove={(e) => removeTodo(e.detail)}
            />
        {/each}
    </div>
    <NewTodo on:addTodo={(e) => addTodo(e.detail)} />
</div>
