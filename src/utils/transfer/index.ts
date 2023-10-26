
import PostResponseProps, { PostRequestProps } from "@/types/export";

/** A class for handling in and out files. */
class Transfer {
  /**
   * Stores the data in a file in the `public/export` directory.
   * @param data The serializable data to be written to the file
   * @param filename The name of the file to be written to
   */
  public static async store(data: any, filename: string, extension: string): Promise<PostResponseProps> {
    const url = '/api/export';
    const body: PostRequestProps = {
      data: JSON.stringify(data),
      filename: filename,
      extension: extension
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
   * Downloads a file from an URL.
   * @param url The URL of the directory in which the file is stored
   * @param file The file to download
   */
  public static download = (url: string, file: string) => {
    const link = document.createElement('a');
    link.href = `${url}/${file}`;
    link.download = file;
    link.click();
  }

  /**
   * Returns the content of a file.
   * @param file The file to read
   */
  public static async load(file: File) {
    return new Promise((resolve: (value: string) => void, reject: (reason: Error) => void) => {
      const reader = new FileReader();

      reader.onload = function (event) {
        resolve(event.target!.result as string);
      };

      reader.onerror = function () {
        reject(new Error('Failed to read file'));
      };

      reader.readAsText(file);
    });
  }
}

export default Transfer;
