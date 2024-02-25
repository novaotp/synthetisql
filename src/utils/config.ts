import { CONFIG_PATH, DEFAULT_CONFIG_DATA } from "$config/config";
import type { Config } from "$models/Config";
import { BaseDirectory, readTextFile, writeTextFile } from "@tauri-apps/api/fs";

const isValidConfigFormat = (config: Object): config is Config => {
    if (!("autoSave" in config && typeof config.autoSave === "string")) {
        return false;
    }

    if (!("defaultFilenamePrefix" in config && typeof config.defaultFilenamePrefix === "string")) {
        return false;
    }

    if (!("language" in config && typeof config.language === "string")) {
        return false;
    }

    return true;
}

/** Returns the config's file contents. */
export const config = async (): Promise<Config> => {
    const contents = await readTextFile(CONFIG_PATH, { dir: BaseDirectory.Document });
    let config = JSON.parse(contents);

    if (!isValidConfigFormat(config)) {
        await writeTextFile(CONFIG_PATH, JSON.stringify(DEFAULT_CONFIG_DATA), { dir: BaseDirectory.Document });
        config = DEFAULT_CONFIG_DATA;
    }

    return config;
}