<script>
    export let todo;
    import { createEventDispatcher } from "svelte";
    import { clickOutside } from "../utils.js";
    import { fade } from "svelte/transition";

    const dispatch = createEventDispatcher();

    let editing = false;
    let hovering = false;
    let editField;
    let name = todo.name;
    let editButtonPressed = false;

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
        editButtonPressed = true;
        editing = true;
    }

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

    function activeHover() {
        hovering = true;
    }
    function inactiveHover() {
        hovering = false;
    }
</script>

{#if editing}
    <form
        on:submit|preventDefault={onSave}
        class="todo-item"
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
            bind:this={editField}
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
            on:click={onEdit}>{todo.name}</label
        >
        {#if hovering}
            <button type="button" class="todo-btn" on:click={onRemove}>
                <i class="fas fa-trash-alt" />
            </button>
        {/if}
    </div>
{/if}
