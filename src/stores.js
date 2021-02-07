import { readable, writable } from "svelte/store";
import { localStore } from './localStore.js'

export const time = readable(new Date(), set => {
    const interval = setInterval(() => {
        set(new Date());
    }, 10)

    return () => clearInterval(interval);
});

const initialTodos = [
    { id: 1, name: 'Visit Pomodomore', completed: true, project: 1 },
    { id: 2, name: 'Add a new task to your ToDo list', completed: false, project: 1 },
    { id: 3, name: 'Create a new project!', completed: true, project: 2 },
]
const initialProjects = [
    { id: 1, name: 'Quick Tasks', design: "#03abff" }
]
const initialTimers = [
    { id: 0, time: 25, design: "#ff542d", desc: "Activity" }, //Task time
    { id: 1, time: 5, design: "#38d1ff", desc: "Short Break" }, //Short break
    { id: 2, time: 15, design: "#00b730", desc: "Long Break" } //Long break

]

export const currProject = localStore('pomodomore-currentproject', 1);
export const todos = localStore('pomodomore-todos', initialTodos);
export const projects = localStore('pomodomore-projects', initialProjects);
export const timers = localStore('pomodomore-timers', initialTimers);