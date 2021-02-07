<script>
    import { onMount } from "svelte";
    import { time, timers } from "../stores.js";
    import { padWithZeroes } from "../utils.js";

    export let percentTimeRemaining;
    export let currTimer;

    let currTask = 1; //Track how far through the pomodoro process a user is (4 tasks completed until long break)
    let taskTime; //Length of time (seconds) for a task
    let shortBreak; //Length of time (seconds) for a short break
    let longBreak; //Length of time (seconds) for a long break
    let timer; //Timer stores current time (either taskTime, shortBreak, longBreak)
    let elapsedTime = 0; //Holds the elapsed time when pausing/resuming the timer
    let start; //Get current time when starting/resuming timer
    let running = false; //Is timer running?
    let started = false; //Has the timer been started?

    onMount(() => {
        taskTime = $timers[0].time * 60; //Initialise from localstore
        shortBreak = $timers[1].time * 60; //Initialise from localstore
        longBreak = $timers[2].time * 60; //Initialise from localstore
        timer = toWait = taskTime; //Timer and toWait equal taskTime by default
        currTask = 1; //Initialise at first task
        currTimer = $timers[0]; //Current timer is taskTimer
        start = $time.getTime(); //Get current timer
    });

    //Keep track of Settings component changing the timer values for each event and update on change
    $: {
        taskTime = $timers[0].time * 60;
        shortBreak = $timers[1].time * 60;
        longBreak = $timers[2].time * 60;
        updateTimer(); //Update timer value
        toWait = timer; //Reset timer if changed
    }

    function pauseTimer() {
        elapsedTime = $time.getTime() - start + elapsedTime;
        running = false;
    }

    function resumeTimer() {
        start = $time.getTime();
        running = true;
    }

    //Stop timer and return to start of current task/break
    function resetTimer() {
        started = running = false;
        elapsedTime = 0;
        toWait = timer;
    }

    //Start timer for current task, this is only used after a reset or moving from task -> break or break -> task
    function startTimer() {
        start = $time.getTime();
        started = running = true;
        currTimer = currTask == 0 ? $timers[2] : $timers[(currTask - 1) % 2];
    }

    //Update current timer if timer values change or moving to next event
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

    //Move to next event (task or break)
    function proceedToNextTimer() {
        currTask++;
        running = false;
        updateTimer();
        return 0; //Keep toWait at zero until "Next" pressed
    }

    $: currTime = running
        ? Math.floor(($time.getTime() - start + elapsedTime) / 1000)
        : currTime; //Keep track of the current timer in seconds
    $: toWait = running
        ? timer - currTime > 0
            ? timer - currTime
            : proceedToNextTimer()
        : toWait; //How long to wait until the current timer finishes, otherwise paused, or if at 0, proceed to the next timer
    $: minutes = Math.floor(toWait / 60); //Calculate number of minutes remaining
    $: seconds = Math.floor(toWait % 60); //Calculate number of seconds remaining (in current minute)
    $: percentTimeRemaining = timer > 0 ? (toWait / timer) * 100 : 0; //Calculate percentage of time remaining in timer
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

<style>
    #pomodoro-timer {
        margin-top: 3rem;
    }

    #pomo-controls {
        display: flex;
        width: 100%;
        flex-direction: row;
    }

    #pomo-controls button {
        width: 100%;
        margin: 0px 10px 10px 10px;
    }

    #pomo-clock {
        font-family: "JetBrains Mono", monospace;
        font-size: 10rem;
        line-height: 11rem;
        font-weight: 700;
        color: #fff;
        text-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
        user-select: none;
    }
</style>
