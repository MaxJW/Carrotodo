<script>
    import NewTodo from "./NewTodo.svelte";
    import Todo from "./Todo.svelte";
    import { currProject } from "../stores.js"

    export let todos = [];

    let currProj;
    const unsubscribe = currProject.subscribe(value => {
        currProj = value;
    });

    $: newTodoId = todos.length ? Math.max(...todos.map((t) => t.id)) + 1 : 1;

    function addTodo(name) {
        todos = [...todos, { id: newTodoId, name, completed: false, project: currProj }];
        console.log(name);
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
        {#if todo.project === currProj}
            <Todo
                {todo}
                on:update={(e) => updateTodo(e.detail)}
                on:remove={(e) => removeTodo(e.detail)}
            />
        {/if}
    {/each}
    <NewTodo on:addTodo={(e) => addTodo(e.detail)} />
</div>
