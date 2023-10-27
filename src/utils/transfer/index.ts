
import PostResponseProps, { DeleteRequestProps, PostRequestProps } from "@/types/export";
import StoreProps from "./types";

/** Stores the data in a file and returns its name (with extension). */
const store = async ({ path, filename, data }: StoreProps): Promise<PostResponseProps> => {
  const url = '/api/export';
  const body: PostRequestProps = {
    path,
    data: JSON.stringify(data),
    filename,
  }
  const init: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }

  const response = await fetch(url, init);
  return await response.json();
}

/**
 * Downloads a file for the user.
 * @param path The relative path of the directory in which the file is stored
 * @param filename The name of the file to download (with extension)
 */
const download = (path: string, filename: string): void => {
  const link = document.createElement('a');
  link.href = `${process.env.NEXT_PUBLIC_WEBAPP_URL}/${path}/${filename}`;
  link.download = filename;
  link.click();
}

/**
 * Returns the stringified content of a file.
 * @param file The file to read
 */
const load = (file: File): Promise<string> => {
  return new Promise((resolve: (value: string) => void, reject: (reason: string) => void) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      resolve(event.target!.result as string);
    };

    reader.onerror = function () {
      reject('Failed to read file');
    };

    reader.readAsText(file);
  });
}

/**
 * Deletes a file that matches the given filename.
 * @param path The relative path of the directory in which the file is stored.
 * @param filename The name of the file to delete
 */
const discard = async (path: string, filename: string): Promise<void> => {
  const url = `/api/export`;
  const body: DeleteRequestProps = {
    path,
    filename,
  }
  const init: RequestInit = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };

  const response = await fetch(url, init);
  return await response.json();
}

export { store, download, load, discard };
