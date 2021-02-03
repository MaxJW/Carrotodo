import { readable } from "svelte/store";

export const time = readable(new Date(), set => {
    const interval = setInterval(() => {
        set(new Date());
    }, 10)

    return () => clearInterval(interval);
});