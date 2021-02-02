<script>
    import { time } from "../stores.js";

    $: hours = $time.getHours();
    $: minutes = $time.getMinutes();

    let months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ],
        days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];

    $: date =
        days[$time.getDay()] +
        " " +
        $time.getDate() +
        " " +
        months[$time.getMonth()];
</script>

<div id="time-date" class="pos-fixed center-full pos-fixed">
    <div id="date">{date}</div>
    <div id="time">{hours}:{minutes}</div>
</div>
