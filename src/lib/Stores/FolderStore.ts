import { writable } from 'svelte/store';

export const Folders = writable([
    { id: 1, name: "Folder 1" },
    { id: 2, name: "Folder 2" },
    { id: 3, name: "Folder 3" },
    { id: 4, name: "Folder 4" },
    { id: 5, name: "Folder 5" },
]);