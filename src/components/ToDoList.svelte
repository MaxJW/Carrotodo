<script>
    import NewTodo from "./NewTodo.svelte";
    import Todo from "./Todo.svelte";

    export let todos = [];

    $: newTodoId = todos.length ? Math.max(...todos.map((t) => t.id)) + 1 : 1;

    function addTodo(name) {
        todos = [...todos, { id: newTodoId, name, completed: false }];
    }

    function removeTodo(todo) {
        todos = todos.filter((t) => t.id !== todo.id);
    }

    function updateTodo(todo) {
        const i = todos.findIndex((t) => t.id === todo.id);
        todos[i] = { ...todos[i], ...todo };
    }
</script>

<div id="todo-list" class="center-full">
    {#each todos as todo (todo.id)}
        <Todo
            {todo}
            on:update={(e) => updateTodo(e.detail)}
            on:remove={(e) => removeTodo(e.detail)}
        />
    {/each}
    <NewTodo on:addTodo={(e) => addTodo(e.detail)} />
</div>
