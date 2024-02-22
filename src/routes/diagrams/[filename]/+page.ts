import { BaseDirectory, readTextFile } from '@tauri-apps/api/fs';
import type { PageLoad } from './$types';
import type { IndexedTableModel } from '$models/Table';
import { MODEL_PATH } from '$config/config';

export const load: PageLoad = async ({ params }) => {
	const contents = JSON.parse(await readTextFile(`${MODEL_PATH}/${params.filename}`, { dir: BaseDirectory.Document }));

	const isValidModelFormat = (model: any[]): boolean => {
		for (const indexedTable of model) {
			if (indexedTable.id === undefined) {
				return false;
			}

			if (!("x" in indexedTable.position && "y" in indexedTable.position)) {
				return false;
			}

			if (!("name" in indexedTable.table)) {
				return false;
			}

			for (const indexedRow of indexedTable.table.rows) {
				if (indexedRow.id !== undefined) {
					return false;
				}

				if (!("name" in indexedRow.row &&
					"type" in indexedRow.row &&
					"precision" in indexedRow.row &&
					"primaryKey" in indexedRow.row &&
					"foreignKey" in indexedRow.row &&
					"autoIncrement" in indexedRow.row &&
					"notNull" in indexedRow.row &&
					"unique" in indexedRow.row &&
					"check" in indexedRow.row &&
					"default" in indexedRow.row &&
					"onUpdate" in indexedRow.row &&
					"onDelete" in indexedRow.row &&
					"comment" in indexedRow.row
				)) {
					return false;
				}
			}
		}

		return true;
	}

	if (!isValidModelFormat(contents)) {
		return {
			message: "Invalid file"
		}
	}

	return {
		diagram: contents as IndexedTableModel[]
	};
};
