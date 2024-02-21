import { BaseDirectory, createDir, exists, writeTextFile } from '@tauri-apps/api/fs';

/**
 * Creates a new file inside the `Desktop/test` directory.
 * @param filename The name of the file to create
 */
export const createFile = async (filename: string, initialContent: string = '') => {
	if (!(await exists('data', { dir: BaseDirectory.Desktop }))) {
		await createDir('data', { dir: BaseDirectory.Desktop, recursive: true });
	}

	await writeTextFile(`data/${filename}`, initialContent, { dir: BaseDirectory.Desktop });
};
