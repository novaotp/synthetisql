
"use server";

import fs from 'fs';

/**
 * Stores the data in a file and returns its name (with extension) or `undefined` if failed.
 * @param path The relative path of the directory in which the file will be stored.
 * @param data The serializable data to be written to the file.
 * @param filename The name of the file - or a derived one - to be written to. Should include the file extension.
 */
export const store = async (path: string, filename: string, data: any): Promise<string | undefined> => {
  const [name, extension] = filename.split('.');

  try {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }

    let i = 0;
    while (fs.existsSync(`${path}/${filename}`)) {
      filename = `${name}-${++i}.${extension}`;
    }

    fs.writeFileSync(`${path}/${filename}`, JSON.stringify(data));

    return filename;

  } catch (err) {
    console.error(`Error while exporting : ${err}`);
    return undefined;

  }
}

/**
 * Deletes a file that matches the given filename and returns wether it succeeded or not.
 * @param path The relative path of the directory in which the file is stored.
 * @param filename The name of the file to delete
 */
export const discard = async (path: string, filename: string): Promise<boolean> => {
  try {
    if (fs.existsSync(`${path}/${filename}`)) {
      fs.unlinkSync(`${path}/${filename}`);
    }

    return true;

  } catch (err) {
    console.error(`Error while exporting : ${err}`);
    return false;

  }
}
