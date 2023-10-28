
/** A class to simulate objects. */
class Simulate {
  /**
   * Simulates a file object.
   * @param fileBits The data of the file
   * @param fileName The name of the file
   * @param options Additional options
   */
  public static file(fileBits: BlobPart[], fileName: string, options?: FilePropertyBag | undefined): File {
    return new File(fileBits, fileName, options);
  }
}

export default Simulate;
