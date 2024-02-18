import {} from "https://cdn.jsdelivr.net/npm/jszip@3.2.1/dist/jszip.js";

export const zip = async(files, iscompress = true) => { // files = [{ name, data:Uint8Array }]
  const zip = new JSZip();
  files.forEach(file => zip.file(file.name, file.data));
  const compression = iscompress ? "DEFLATE" : "STORE";
  const bin = await zip.generateAsync({ type: "arraybuffer", compression });
  return new Uint8Array(bin);
};
