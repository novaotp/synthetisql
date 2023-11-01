
/**
 * Downloads a file for the user.
 * @param path The relative path of the directory in which the file is stored
 * @param filename The name of the file to download (with extension)
 */
export const download = (path: string, filename: string): void => {
  const link = document.createElement('a');
  link.href = `${process.env.NEXT_PUBLIC_WEBAPP_URL ?? 'http://localhost:5173'}/${path}/${filename}`;
  link.download = filename;
  link.click();
}

/**
 * Returns the stringified content of a {@link File}.
 * @param file The file to read
 */
export const load = async (file: File): Promise<string> => {
  return new Promise((resolve: (value: string) => void, reject: (reason: string) => void) => {
    const reader = new FileReader();

    reader.onload = (event) => resolve(event.target!.result as string);
    reader.onerror = () => reject('Failed to read file');

    reader.readAsText(file);
  });
}
