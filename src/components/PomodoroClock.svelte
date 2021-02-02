<script>
    import { onMount } from "svelte";
    import { time } from "../stores.js";

    const padWithZeroes = (number) => number.toString().padStart(2, '0');

    let timer = (25 * 60)-1; // -1 to adjust for extra second
    let start;
    
    onMount(() => {
        start = new Date().getTime();
    });

    $: currTime = Math.floor(($time.getTime() - start) / 1000);
    $: toWait = timer - currTime > 0 ? timer - currTime : 0;
    $: minutes = Math.floor(toWait / 60);
    $: seconds = toWait - minutes * 60;
</script>

<div id="pomodoro-clock">{padWithZeroes(minutes)}:{padWithZeroes(seconds)}</div>
