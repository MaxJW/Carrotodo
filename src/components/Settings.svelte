<script>
	import { timers } from "../stores.js";
	import { clickOutside } from "../utils.js";

	let settingsOpen = false;
	
	const onClick = () => {
		settingsOpen = !settingsOpen;
	};

	function hideSettings() {
		settingsOpen = false;
	}
</script>

<div id="settings" class="pos-fixed tl" on:click={onClick}>
	<i class="fas fa-wrench" />
</div>

{#if settingsOpen}
	<div id="settings-panel" class="pos-abs center-full">
		<h1>Settings</h1>
		<form
			id="settings-form"
			class="center-full"
			on:submit|preventDefault|nonpassive={hideSettings}
			use:clickOutside
			on:click_outside={hideSettings}
		>
			{#each $timers as timer (timer.id)}
				<div class="timer-setting-column center-full">
					<label for="timer-{timer.id}-label">
						{timer.desc}
					</label>
					<input
						bind:value={timer.time}
						type="number"
						id="timer-{timer.id}-value"
						autoComplete="off"
						placeholder="25"
					/>
					<input
						bind:value={timer.design}
						type="color"
						id="timer-{timer.id}-colour"
						placeholder="#ff542d"
					/>
				</div>
			{/each}
		</form>
		<!--Alarm volume-->
	</div>
{/if}
