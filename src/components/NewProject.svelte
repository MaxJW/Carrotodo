<script>
    import { createEventDispatcher } from "svelte";
    import { clickOutside } from "../utils.js";
    import Project from "./Project.svelte";

    const dispatch = createEventDispatcher();

    let name = "";
    let design = "#ff0000";
    let editing = false;
    let emptyProject = { design: "#10171d" };

    const addProject = () => {
        if (name && design) {
            dispatch("add", { pname: name, pdesign: design });
            name = "";
            editing = false;
        }
    };

    const onCancel = () => {
        editing = false;
        name = "";
        design = "";
    };

    function handleKeydown(e) {
        console.log(e.key);
        if (e.key === "Escape") {
            onCancel();
        } else if (e.key === "Enter") {
            addProject(name, design);
        }
    }

    function toggleEditing() {
        editing = !editing;
    }
</script>

{#if editing}
    <form
        class="project center-full"
        style="--background-color: {emptyProject.design}"
        on:submit|preventDefault={addProject}
        on:keydown={handleKeydown}
        use:clickOutside
        on:click_outside={onCancel}
    >
        <input
            bind:value={name}
            type="text"
            id="newproj-name"
            autoComplete="off"
            placeholder="Create new project"
        />
        <input bind:value={design} type="color" id="newproj-design" />
        <button type="submit" disabled={!name} class="center-full"
            ><i class="fas fa-plus" /></button
        >
    </form>
{:else}
    <Project bind:project={emptyProject} on:select={toggleEditing}>
        <span slot="name">New Project</span>
    </Project>
{/if}
