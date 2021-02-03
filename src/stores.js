import { readable, writable } from "svelte/store";
import { localStore } from './localStore.js'

export const time = readable(new Date(), set => {
    const interval = setInterval(() => {
        set(new Date());
    }, 10)

    return () => clearInterval(interval);
});

const initialTodos = [
    { id: 1, name: 'Visit Pomodomore', completed: true },
    { id: 2, name: 'Add a new task to your ToDo list', completed: false },
]

export const todos = localStore('pomodomore-todos', initialTodos)