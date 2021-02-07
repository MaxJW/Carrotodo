<script>
    export let todo;
    import { createEventDispatcher } from "svelte";
    import { clickOutside } from "../utils.js";
    import { fade } from "svelte/transition";
    import { currProject } from "../stores.js";

    const dispatch = createEventDispatcher(); //Dispatch events to ToDoList

    let editing = false; //Track if editing current ToDo name
    let hovering = false; //Check if hovering over current ToDo (show delete icon)
    let name = todo.name; //Get name of current ToDo

    function update(updatedTodo) {
        todo = { ...todo, ...updatedTodo };
        dispatch("update", todo);
    }

    function onCancel() {
        name = todo.name;
        editing = false;
    }

    function onSave() {
        update({ name: name });
        editing = false;
    }

    function onRemove() {
        dispatch("remove", todo);
    }

    function onEdit() {
        editing = true;
    }

    //Select text within ToDo
    function highlightToDo(node) {
        node.select();
    }

    function onToggle() {
        update({ completed: !todo.completed });
    }

    function handleKeydown(e) {
        if (e.key === "Escape") {
            onCancel();
        } else if (e.key === "Enter" && name) {
            onSave(name);
        }
    }

    //If hovering over ToDo
    function activeHover() {
        hovering = true;
    }
    //No longer hovering over ToDo
    function inactiveHover() {
        hovering = false;
    }
</script>

{#if editing}
    <form
        on:submit|preventDefault={onSave}
        class="todo-item"
        class:invis={todo.project !== $currProject}
        on:keydown={handleKeydown}
        on:mouseenter={activeHover}
        on:mouseleave={inactiveHover}
    >
        <input
            type="checkbox"
            id="todo-{todo.id}-cb"
            on:click={onToggle}
            disabled
            checked={todo.completed}
            class="todo-check"
        />
        <input
            bind:value={name}
            use:highlightToDo
            use:clickOutside
            on:click_outside={onSave}
            type="text"
            id="todo-{todo.id}"
            autoComplete="off"
            class="todo-label"
        />
        {#if hovering}
            <button type="button" class="todo-btn" on:click={onRemove}>
                <i class="fas fa-trash-alt" />
            </button>
        {/if}
    </form>
{:else}
    <div
        class="todo-item"
        class:invis={todo.project !== $currProject}
        on:mouseenter={activeHover}
        on:mouseleave={inactiveHover}
    >
        <input
            type="checkbox"
            id="todo-{todo.id}"
            on:click={onToggle}
            checked={todo.completed}
            class="todo-check"
        />
        <label
            for="todo-{todo.id}"
            class="todo-label {todo.completed ? 'strikethrough' : ''}"
            class:strikethrough={todo.completed}
            on:click={onEdit}>{todo.name}</label
        >
        {#if hovering}
            <button type="button" class="todo-btn" on:click={onRemove}>
                <i class="fas fa-trash-alt" />
            </button>
        {/if}
    </div>
{/if}

<style>
    .invis {
        display: none !important;
    }

    .todo-item {
        margin-bottom: 0.7em;
        padding-bottom: 0.7em;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .todo-btn {
        width: 8%;
    }
</style>
