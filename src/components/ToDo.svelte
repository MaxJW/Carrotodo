<script>
    export let todo;
    import { createEventDispatcher } from "svelte";
    import { clickOutside } from "../utils.js";
    import { fade } from "svelte/transition";

    const dispatch = createEventDispatcher();

    let editing = false; // track editing mode
    let hovering = false;
    let editField;
    let name = todo.name; // hold the name of the todo being edited
    let editButtonPressed = false; // track if edit button has been pressed, to give focus to it after cancel or save

    function update(updatedTodo) {
        todo = { ...todo, ...updatedTodo }; // applies modifications to todo
        dispatch("update", todo); // emit update event
    }

    function onCancel() {
        name = todo.name; // restores name to its initial value and
        editing = false; // and exit editing mode
    }

    function onSave() {
        update({ name: name }); // updates todo name
        editing = false; // and exit editing mode
    }

    function onRemove() {
        dispatch("remove", todo); // emit remove event
    }

    function onEdit() {
        editButtonPressed = true; // user pressed the Edit button, focus will come back to the Edit button
        editing = true; // enter editing mode
    }

    function highlightToDo(node) {
        node.select();
    }

    function onToggle() {
        update({ completed: !todo.completed }); // updates todo status
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
    <!-- markup for editing todo: label, input text, Cancel and Save Button -->
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
        <label for="todo-{todo.id}" class="todo-label {todo.completed ? 'strikethrough' : ''}" on:click={onEdit}
            >{todo.name}</label
        >
        {#if hovering}
            <button type="button" class="todo-btn" on:click={onRemove}>
                <i class="fas fa-trash-alt" />
            </button>
        {/if}
    </div>
{/if}
