import { BaseDirectory, readTextFile, writeTextFile } from '@tauri-apps/api/fs';
import type { PageLoad } from './$types';
import { CONFIG_PATH, DEFAULT_CONFIG_DATA } from '$config/config';
import type { Config } from '$models/Config';

const isValidConfigFormat = (config: Object): config is Config => {
    if (!("autoSave" in config && typeof config.autoSave === "boolean")) {
        return false;
    }

    if (!("defaultFilenamePrefix" in config && typeof config.defaultFilenamePrefix === "string")) {
        return false;
    }

    return true;
}

export const load: PageLoad = async () => {
	const contents = await readTextFile(CONFIG_PATH, { dir: BaseDirectory.Document });
    let config = JSON.parse(contents);

    if (!isValidConfigFormat(config)) {
        await writeTextFile(CONFIG_PATH, JSON.stringify(DEFAULT_CONFIG_DATA), { dir: BaseDirectory.Document });
        config = DEFAULT_CONFIG_DATA;
    }

	return {
		config: config as Config
	};
};
