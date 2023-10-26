
interface PostRequestProps {
  /** The data to store. */
  data: string,
  /** The filename to use, or a derived one if it already exists. */
  filename: string,
  /** The extension of the file. */
  extension: string,
}

interface PostResponseProps {
  /** The file or `undefined`. */
  file: string | undefined,
  /** A message. */
  message: string,
}

export type { PostRequestProps };
export default PostResponseProps;
