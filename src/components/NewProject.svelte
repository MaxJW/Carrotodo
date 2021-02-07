<script>
    import { createEventDispatcher } from "svelte";
    import { clickOutside } from "../utils.js";
    import Project from "./Project.svelte";

    const dispatch = createEventDispatcher(); //Used to dispatch events to ProjectPanel component

    let name = "";
    let design = "#ff0000";
    let editing = false;
    let emptyProject = { design: "#10171d" }; //Black background for new project panel

    //Add a new project if both the name and colour have been chosen
    const addProject = () => {
        if (name && design) {
            if (name.length <= 25) {
                dispatch("add", { pname: name, pdesign: design });
                name = "";
                editing = false;
            }
        }
    };

    //Reset name and design fields
    const onCancel = () => {
        editing = false;
        name = "";
        design = "";
    };

    //Submit on Enter, cancel on Escape
    function handleKeydown(e) {
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
        <div>
            <input
                bind:value={name}
                type="text"
                id="newproj-name"
                autoComplete="off"
                placeholder="Create new project"
                maxlength="25"
            />
            <div class="newproj-lower">
                <input bind:value={design} type="color" id="newproj-design" />
                <button type="submit" disabled={!name} class="center-full"
                    ><i class="fas fa-plus" /></button
                >
            </div>
        </div>
    </form>
{:else}
    <Project bind:project={emptyProject} on:select={toggleEditing}>
        <span slot="name">New Project</span>
    </Project>
{/if}

<style>
    .newproj-lower {
        display: flex;
        justify-content: space-between;
        padding-top: 5px;
    }

    .newproj-lower button {
        width: 30%;
    }

    #newproj-design {
        width: 50%;
    }
</style>
