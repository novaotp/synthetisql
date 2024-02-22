import { MODEL_PATH } from '$config/config';
import { BaseDirectory, writeTextFile } from '@tauri-apps/api/fs';

/**
 * Creates a new file inside the `Desktop/test` directory.
 * @param filename The name of the file to create
 */
export const createFile = async (filename: string, initialContent: string = '') => {
	await writeTextFile(`${MODEL_PATH}/${filename}`, initialContent, { dir: BaseDirectory.Document });
};
