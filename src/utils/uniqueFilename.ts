import { BaseDirectory, exists } from '@tauri-apps/api/fs';

/**
 * Generates a unique filename with the given prefix in the specified directory.
 *
 * @param prefix The prefix for the filename
 * @returns The unique filename
 */
export const uniqueFilename = async (prefix: string): Promise<string> => {
	let id = 1;
	while (true) {
		const filename = `${prefix}_${id}.synmodel`;
		const fullPath = `data/${filename}`;

		try {
			const fileExists = await exists(fullPath, { dir: BaseDirectory.Desktop });

			if (!fileExists) {
				return filename;
			}
		} catch (error) {
			console.error('Error checking file existence:', error);
			throw error;
		}

		id++;
	}
};
