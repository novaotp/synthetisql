import type { IndexedTableModel, TableModel, TablePosition } from "$models/Table";
import { get, writable } from "svelte/store";
import { v4 as uuidv4 } from "uuid";

export const tables = writable<IndexedTableModel[]>([]);
export const selectedTableId = writable<string | undefined>(undefined);

/** Resets every table store. */
export const init = (initialTables: IndexedTableModel[] = [], initialSelectedId: string | undefined = undefined) => {
    clearTables();
    setInitialTables(initialTables);
    setSelectedTableId(initialSelectedId);
}

/** Sets the currently selected table id. */
export const setSelectedTableId = (id: string | undefined) => {
    selectedTableId.set(id);
}

/** Removes all the tables from the store. */
export const clearTables = () => {
    tables.set([]);
}

/** Sets the store as the initial tables. */
export const setInitialTables = (initial: IndexedTableModel[]) => {
    tables.set(initial);
}

/** Gets a table via the given id. */
export const getTable = (id: string): IndexedTableModel | undefined => {
    return get(tables).find(table => table.id === id);
}

/** Adds a new table to the store. */
export const addTable = (position: TablePosition = { x: 0, y: 0 }) => {
    const id = uuidv4();

    tables.update((all) => [{ id, table: { name: "Default Table", rows: [] }, position }, ...all]);
};

/** Updates an existing table from the store. */
export const updateTable = (id: string, table: TableModel, position: TablePosition) => {
    tables.update((all) => all.map(a => a.id === id ? { ...a, table, position } : a));
}

/** Removes a table from the store. */
export const deleteTable = (id: string) => {
    tables.update((all) => all.filter((toast) => toast.id !== id));
};
