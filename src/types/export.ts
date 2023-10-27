
interface PostRequestProps {
  /** The relative path of the directory in which the file will be stored. */
  path: string,
  /** The serialized data to be written to the file. */
  data: string,
   /**
   * The name of the file - or a derived one - to be written to.
   * 
   * Should include the file extension.
   */
   filename: string,
}

interface PostResponseProps {
  /**
   * The file or `undefined`.
   * 
   * Includes the file extension.
   */
  filename: string | undefined,
  /** An additionnal message for handling errors. */
  message: string,
}

interface DeleteRequestProps {
  /** The relative path of the directory in which the file is stored. */
  path: string,
   /**  The name of the file to delete (with extension). */
   filename: string,
}

export type { PostRequestProps, DeleteRequestProps };
export default PostResponseProps;
