
/**
 * An intrinsic object that provides functions to
 * simulate JavaScript values/objects that aren't
 * available by default.
 */
namespace Simulate {
  /**
   * Simulates a {@link File} object.
   * @param fileBits The data of the file
   * @param fileName The name of the file
   * @param options Additional options
   */
  export const file = (fileBits: BlobPart[], fileName: string, options?: FilePropertyBag | undefined): File => {
    return new File(fileBits, fileName, options);
  }
}

export { Simulate };
