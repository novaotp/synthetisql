import type { IndexedTableModel, TableModel, TablePosition } from "$models/Table";
import { writable } from "svelte/store";
import { v4 as uuidv4 } from "uuid";

export const tables = writable<IndexedTableModel[]>([]);

/** Removes all the tables from the store. */
export const clearTables = () => {
    tables.set([]);
}

/** Sets the store as the initial tables. */
export const initialTables = (initial: IndexedTableModel[]) => {
    tables.set(initial);
}

/** Adds a new table to the store. */
export const addTable = () => {
    const id = uuidv4();

    tables.update((all) => [{ id, table: { name: "Default Table", rows: [] }, position: { x: 0, y: 0 } }, ...all]);
};

/** Updates an existing table from the store. */
export const updateTable = (id: string, table: TableModel, position: TablePosition) => {
    tables.update((all) => all.map(a => a.id === id ? { ...a, table, position } : a));
}

/** Removes a table from the store. */
export const deleteTable = (id: string) => {
    tables.update((all) => all.filter((toast) => toast.id !== id));
};
