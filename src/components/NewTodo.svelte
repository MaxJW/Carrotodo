<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher(); //Dispatch events to ToDoList component

    let name = "";

    //Add new ToDo if name is not blank
    const addTodo = () => {
        if (name) {
            dispatch("addTodo", name);
            name = "";
        }
    };

    //Cancel adding new todo
    const onCancel = () => {
        name = "";
    };

    //Submit on Enter, Cancel on Escape
    function handleKeydown(e) {
        if (e.key === "Escape") {
            onCancel();
        } else if (e.key === "Enter") {
            addTodo(name);
        }
    }
</script>

<form
    class="new-todo"
    on:submit|preventDefault={addTodo}
    on:keydown={handleKeydown}
>
    <button type="submit" disabled={!name} class="todo-check new center-full"
        ><i class="fas fa-plus" /></button
    >
    <input
        bind:value={name}
        type="text"
        id="todo-0"
        autoComplete="off"
        class="todo-label new"
        placeholder="Add new task"
    />
</form>

<style>
    .todo-check.new {
        font-size: 1.4em;
    }

    .todo-label.new {
        opacity: 0.7;
    }
</style>
