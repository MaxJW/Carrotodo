<script>
	export let currTimer;
</script>

<div id="pomodoro-icons" class="pos-fixed center-full" style="--curr-colour: {currTimer.design}">
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
