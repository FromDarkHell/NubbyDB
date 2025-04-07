import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { saveAs } from "file-saver";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function downloadBlob(
  data: Uint8Array,
  fileName: string,
  mimeType: string = "application/octet-stream"
) {
  var blob = new Blob([data], { type: mimeType });
  return saveAs(blob, fileName);
}
