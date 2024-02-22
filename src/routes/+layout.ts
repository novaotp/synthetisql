import { BaseDirectory, createDir, exists, writeTextFile } from "@tauri-apps/api/fs";
import type { PageLoad } from "./$types";
import { BASE_PATH, CONFIG_PATH, DEFAULT_CONFIG_DATA, MODEL_PATH } from "$config/config";

export const prerender = true;
export const ssr = false;

export const load: PageLoad = async () => {
    if (!(await exists(BASE_PATH, { dir: BaseDirectory.Document }))) {
		await createDir(BASE_PATH, { dir: BaseDirectory.Document });
	}

    if (!(await exists(MODEL_PATH, { dir: BaseDirectory.Document }))) {
        await createDir(MODEL_PATH, { dir: BaseDirectory.Document });
    }

    if (!(await exists(CONFIG_PATH, { dir: BaseDirectory.Document }))) {
        await writeTextFile(CONFIG_PATH, JSON.stringify(DEFAULT_CONFIG_DATA), { dir: BaseDirectory.Document });
    }
};
