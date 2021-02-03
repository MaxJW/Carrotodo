<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    let name = "";

    const addTodo = () => {
        if (name) {
            dispatch("addTodo", name);
            name = "";
        }
    };

    const onCancel = () => {
        name = "";
    };

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
