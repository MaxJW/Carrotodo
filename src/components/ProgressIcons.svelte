<script>
	export let currTimer; //Keep track of current timer and change colour appropriately
</script>

<div
	id="pomodoro-icons"
	class="pos-fixed center-full"
	style="--curr-colour: {currTimer.design}"
>
	<ul class="center-full">
		<li class:active={currTimer.id === 0}>
			<i class="fas fa-carrot fa-fw" />
		</li>
		<li class:active={currTimer.id === 1}>
			<i class="fas fa-hourglass-half fa-fw" />
		</li>
		<li class:active={currTimer.id === 2}>
			<i class="fas fa-check fa-fw" />
		</li>
	</ul>
</div>

<style>
	.fa-carrot,
	.fa-check,
	.fa-hourglass-half {
		font-size: 2.4em;
	}

	li.active .fa-carrot,
	li.active .fa-check,
	li.active .fa-hourglass-half {
		background-color: var(--curr-colour);
	}

	#pomodoro-icons {
		left: 0;
		height: 100%;
		padding-left: calc(var(--body-padding) * 1.5);
	}

	#pomodoro-icons ul {
		margin: 0;
		padding: 0;
	}

	#pomodoro-icons ul :not(:last-child) {
		padding-bottom: 5px;
	}

	@media only screen and (max-width: 550px) {
		.fa-carrot,
		.fa-check,
		.fa-hourglass-half {
			font-size: 1.8em;
		}
	}
</style>
