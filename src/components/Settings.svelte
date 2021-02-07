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

	const validNum = (e, i) => {
		if (e.target.value % 1 != 0) {
			e.target.value = $timers[i].time =
				Math.floor(e.target.value * 10) / 10;
		}
		if (e.target.value < 0) {
			e.target.value = $timers[i].time = 1;
		}
		if (e.target.value > 300) {
			e.target.value = $timers[i].time = 300;
		}
	};
</script>

<div
	id="settings"
	class="pos-fixed"
	class:active={settingsOpen}
	on:click={onClick}
>
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
						min="1"
						on:blur={(e) => validNum(e, timer.id)}
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
