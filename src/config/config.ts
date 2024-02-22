import type { Config } from "$models/Config";

export const DEFAULT_CONFIG_DATA: Config = {
    autoSave: false,
    defaultFilenamePrefix: "diagram_"
} as const;

export const BASE_PATH = "synthetisql" as const;
export const CONFIG_PATH = `${BASE_PATH}/app.conf` as const;
export const MODEL_PATH = `${BASE_PATH}/data` as const;
