
import PostResponseProps, { PostRequestProps } from "@/types/export";
import Store from "./types";

/** A class for handling in and out files. */
class Transfer {
  /** Stores the data in a file and returns its name (with extension). */
  public static async store({ path, filename, data }: Store): Promise<PostResponseProps> {
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
   * @param file The file to download
   */
  public static download = (path: string, file: string) => {
    const link = document.createElement('a');
    link.href = `${process.env.NEXT_PUBLIC_WEBAPP_URL}/${path}/${file}`;
    link.download = file;
    link.click();
  }

  /**
   * Returns the content of a file.
   * @param file The file to read
   */
  public static async load(file: File): Promise<string> {
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
}

export default Transfer;
