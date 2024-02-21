import { readDir, BaseDirectory } from '@tauri-apps/api/fs';
import type { PageLoad } from './$types';
import { metadata } from 'tauri-plugin-fs-extra-api';
import type { FileData } from '../models/FileData';

export const load: PageLoad = async () => {
	const files: FileData[] = [];

	const entries = await readDir('data', { dir: BaseDirectory.Desktop, recursive: true });

	for (const entry of entries) {
		const meta = await metadata(entry.path);

		files.push({
			filename: entry.name!,
			modifiedAt: meta.modifiedAt
		});
	}

	return {
		files: files
	};
};
