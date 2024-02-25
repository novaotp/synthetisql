import { readDir, BaseDirectory } from '@tauri-apps/api/fs';
import type { PageLoad } from './$types';
import { metadata } from 'tauri-plugin-fs-extra-api';
import type { FileData } from '../models/FileData';
import { MODEL_PATH } from '$config/config';
import { config } from '../utils/config';

export const load: PageLoad = async () => {
	const files: FileData[] = [];

	const entries = await readDir(MODEL_PATH, { dir: BaseDirectory.Document });

	for (const entry of entries) {
		const meta = await metadata(entry.path);

		files.push({
			filename: entry.name!,
			modifiedAt: meta.modifiedAt
		});
	}

	return {
		files: files,
		config: await config()
	};
};
