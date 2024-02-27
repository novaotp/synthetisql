import { writable } from "svelte/store";

export const filename = writable<string | null>(null);

export const setFilename = (value: string | null) => {
    filename.set(value);
};
