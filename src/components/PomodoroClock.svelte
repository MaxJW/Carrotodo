<script>
    import { time } from "../stores.js";

    const padWithZeroes = (number) => number.toString().padStart(2, "0");

    let timer = (toWait = 25 * 60); // -1 to adjust for extra second
    let elapsedTime = 0;
    let start = $time.getTime();
    let running = false;
    let started = false;

    function pauseTimer() {
        elapsedTime = $time.getTime() - start + elapsedTime;
        running = false;
    }

    function resumeTimer() {
        start = $time.getTime();
        running = true;
    }

    function resetTimer() {
        started = running = false;
        elapsedTime = 0;
        toWait = timer;
    }

    function startTimer() {
        start = $time.getTime();
        started = running = true;
    }

    $: currTime = running
        ? Math.floor(($time.getTime() - start + elapsedTime) / 1000)
        : currTime;
    $: toWait = timer - currTime > 0 ? timer - currTime : 0;
    $: minutes = Math.floor(toWait / 60);
    $: seconds = Math.floor(toWait % 60);
</script>

<div id="pomodoro-timer" class="center-full">
    <div id="pomo-clock">{padWithZeroes(minutes)}:{padWithZeroes(seconds)}</div>
    <div id="pomo-controls">
        {#if !started}
            <button type="button" on:click={startTimer}>Start</button>
        {:else}
            <button type="button" on:click={running ? pauseTimer : resumeTimer}
                >{running ? "Pause" : "Resume"}</button
            >
            <button type="button" on:click={resetTimer}>Reset</button>
        {/if}
    </div>
</div>
