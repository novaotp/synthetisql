
/**
 * Encodes a string to Uint8Array.
 * @param str The string to encode
 */
export const encodeString = (str: string): Uint8Array => {
  // Encode string to UTF-8
  var utf8 = unescape(encodeURIComponent(str));

  // Create a Uint8Array to hold the character codes
  var uint8Array = new Uint8Array(utf8.length);

  // Convert each character to a byte (character code) and add to Uint8Array
  for (var i = 0; i < utf8.length; i++) {
    uint8Array[i] = utf8.charCodeAt(i);
  }

  return uint8Array;
}
