export interface SaveFileObject {
  fileName: string;
  contents: Object;
}

export function loadSaveFile(
  fileName: string,
  blob: ArrayBuffer
): SaveFileObject {
  // Strip off the final null byte at the end of the string (lol)
  var jsonContents = new TextDecoder("utf-8").decode(blob.slice(0, -1));
  var contents = JSON.parse(jsonContents);

  return {
    fileName: fileName,
    contents: contents,
  };
}

export function saveSaveFile(saveFile: SaveFileObject): Uint8Array {
  var jsonContents = JSON.stringify(saveFile.contents);
  var encodedContents = new TextEncoder().encode(jsonContents);

  var nullPadded = new Uint8Array([...encodedContents, 0x00]);

  return nullPadded;
}
