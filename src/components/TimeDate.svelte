<script>
    import { time } from "../stores.js";
    import { padWithZeroes } from "../utils.js";

    $: hours = padWithZeroes($time.getHours()); //Pad time with zeros
    $: minutes = padWithZeroes($time.getMinutes()); //Pad time with zeros

    //Store months and days, seems to be the only way currently without involving an external library
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
        months[$time.getMonth()]; //Get current day, date, and month in format (Monday 1 January)
</script>

<div id="time-date" class="pos-fixed center-full pos-abs">
    <div id="date">{date}</div>
    <div id="time">{hours}:{minutes}</div>
</div>

<style>
    #time-date {
        width: 100%;
        padding-top: var(--body-padding);
        z-index: 2;
        user-select: none;
    }
</style>
