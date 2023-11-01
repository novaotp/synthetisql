
/**
 * An intrinsic object that provides functions to
 * simulate JavaScript values/objects that aren't
 * available by default.
 */
class Simulate {
  /**
   * Simulates a {@link File} object.
   * @param fileBits The data of the file
   * @param fileName The name of the file
   * @param options Additional options
   */
  public static file(fileBits: BlobPart[], fileName: string, options?: FilePropertyBag | undefined): File {
    return new File(fileBits, fileName, options);
  }
}

export { Simulate };
