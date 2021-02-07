<script>
    import { onMount } from "svelte";
    import { time, timers } from "../stores.js";
    import { padWithZeroes } from "../utils.js";

    export let percentTimeRemaining;
    export let currDesign = "#202b38"; //Cheat to remove initial tweening of loading colour on page launch

    let currTask = 1;
    $: taskTime = $timers[0].time * 60;
    $: shortBreak = $timers[1].time * 60;
    $: longBreak = $timers[2].time * 60;
    $: {
        console.log({taskTime}, {shortBreak}, {longBreak});
        updateTimer();
        toWait = timer;
    }
    let timer = taskTime;
    let elapsedTime = 0;
    let start = $time.getTime();
    let running = false;
    let started = false;

    onMount(() => {
        timer = toWait = taskTime;
        currTask = 1;
        start = $time.getTime();
    });

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
        currDesign =
            currTask == 0
                ? $timers[2].design
                : $timers[(currTask - 1) % 2].design;
    }

    function updateTimer() {
        if (currTask % 2 === 0) {
            if (currTask === 8) {
                timer = longBreak;
                currTask = 0;
            } else {
                timer = shortBreak;
            }
        } else {
            timer = taskTime;
        }
    }

    function proceedToNextTimer() {
        currTask++;
        running = false;
        updateTimer();
        return 0; //Keep toWait at zero until "Next" pressed
    }

    $: currTime = running
        ? Math.floor(($time.getTime() - start + elapsedTime) / 1000)
        : currTime;
    $: toWait = running
        ? timer - currTime > 0
            ? timer - currTime
            : proceedToNextTimer()
        : toWait;
    $: minutes = Math.floor(toWait / 60);
    $: seconds = Math.floor(toWait % 60);
    $: percentTimeRemaining = timer > 0 ? (toWait / timer) * 100 : 0;
</script>

<div id="pomodoro-timer" class="center-full">
    <div id="pomo-clock">{padWithZeroes(minutes)}:{padWithZeroes(seconds)}</div>
    <div id="pomo-controls">
        {#if !started}
            <button type="button" on:click={startTimer}>Start</button>
        {:else}
            {#if toWait > 0}
                <button
                    type="button"
                    on:click={running ? pauseTimer : resumeTimer}
                    >{running ? "Pause" : "Resume"}</button
                >
            {/if}
            <button type="button" on:click={resetTimer}
                >{toWait > 0 ? "Reset" : "Next"}</button
            >
        {/if}
    </div>
</div>
