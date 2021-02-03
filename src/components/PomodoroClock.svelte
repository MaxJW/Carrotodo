<script>
    import { time } from "../stores.js";

    const padWithZeroes = (number) => number.toString().padStart(2, "0");

    let timer = toWait = 25 * 60 // -1 to adjust for extra second
    let elapsedTime = 0;
    let start = new Date().getTime();
    let running = false;
    let started = false;

    function pauseTimer() {
        elapsedTime = Math.floor($time.getTime() - start);
        running = false;
    }

    function resumeTimer() {
        start = new Date().getTime();
        running = true;
    }

    function resetTimer() {
        started = running = false;
        toWait = timer;
    }

    function startTimer() {
        start = new Date().getTime();
        started = running = true;
    }

    $: currTime = running
        ? Math.floor(($time.getTime() - start + elapsedTime) / 1000)
        : currTime;
    $: toWait = running
        ? timer - currTime > 0
            ? timer - currTime
            : 0
        : toWait;
    $: minutes = Math.floor(toWait / 60);
    $: seconds = toWait - minutes * 60;
</script>

<div id="pomodoro-clock">{padWithZeroes(minutes)}:{padWithZeroes(seconds)}</div>
<div id="start-stop">
    {#if !started}
        <button type="button" on:click={startTimer}>Start</button>
    {:else}
        <button type="button" on:click={running ? pauseTimer : resumeTimer}
            >{running ? "Pause" : "Resume"}</button
        >
        <button type="button" on:click={resetTimer}>Reset</button>
    {/if}
</div>
