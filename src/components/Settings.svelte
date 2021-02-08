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

	//Check settings have valid numbers entered (validated when leaving focus on an input field)
	//Min value: 0.1 minutes (though if 0, defaults to 1 minute)
	//Max value: 300 minutes (5 hours, possibly a bit excessive)
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
	<div
		id="settings-panel"
		class="pos-abs center-full"
		use:clickOutside
		on:click_outside={hideSettings}
	>
		<h1>Settings</h1>
		<form
			id="settings-form"
			class="center-full"
			on:submit|preventDefault|nonpassive={hideSettings}
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
		<!--Alarm volume - to implement-->
	</div>
{/if}

<style>
	#settings {
		padding: var(--body-padding);
		z-index: 3;
	}

	#settings-panel {
		border-radius: 6px;
		background-color: #161f27dd;
		min-width: 40%;
		margin: calc(var(--body-padding) * 3);
		padding: var(--body-padding);
		z-index: 5;
	}

	#settings-panel h1 {
		margin-top: 0;
	}

	#settings-panel form {
		display: flex;
		flex-direction: row;
	}

	#settings-panel form input[type="color"] {
		width: -webkit-fill-available;
	}

	.timer-setting-column {
		display: flex;
		flex-direction: column;
		padding: 10px;
	}

	.timer-setting-column * {
		margin: 5px;
	}

	.fa-wrench:hover,
	#settings.active .fa-wrench {
		background-color: #161f27ad;
	}

	@media only screen and (max-width: 750px) {
		#settings-panel form {
			flex-direction: column;
		}
	}
</style>
