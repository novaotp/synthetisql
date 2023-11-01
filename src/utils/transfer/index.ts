
import PostResponseProps, { DeleteRequestProps, PostRequestProps } from "@/types/export";
import StoreProps from "./types";

/**
 * An intrinsic object that provides functions to
 * manage files more easily.
 */
class Transfer {
  /** Stores the data in a file and returns its name (with extension). */
  public static async store({ path, filename, data }: StoreProps): Promise<PostResponseProps> {
    const url = `${process.env.NEXT_PUBLIC_WEBAPP_URL ?? 'http://localhost:5173'}/api/export`;
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
  public static download(path: string, filename: string): void {
    const link = document.createElement('a');
    link.href = `${process.env.NEXT_PUBLIC_WEBAPP_URL ?? 'http://localhost:5173'}/${path}/${filename}`;
    link.download = filename;
    link.click();
  }

  /**
   * Returns the stringified content of a {@link File}.
   * @param file The file to read
   */
  public static async load(file: File): Promise<string> {
    return new Promise((resolve: (value: string) => void, reject: (reason: string) => void) => {
      const reader = new FileReader();

      reader.onload = (event) => resolve(event.target!.result as string);
      reader.onerror = () => reject('Failed to read file');

      reader.readAsText(file);
    });
  }

  /**
   * Deletes a file that matches the given filename.
   * @param path The relative path of the directory in which the file is stored.
   * @param filename The name of the file to delete
   */
  public static async discard(path: string, filename: string): Promise<void> {
    const url = `${process.env.NEXT_PUBLIC_WEBAPP_URL ?? 'http://localhost:5173'}/api/export`;
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
}

export { Transfer };
