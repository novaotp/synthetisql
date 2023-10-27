
interface Store {
  /** The relative path of the directory in which the file will be stored. */
  path: string,
  /** The serializable data to be written to the file. */
  data: any,
  /**
   * The name of the file - or a derived one - to be written to.
   * 
   * Should include the file extension.
   */
  filename: string,
}

export default Store;
