import {} from "https://cdn.jsdelivr.net/npm/jszip@3.2.1/dist/jszip.js";

export const zip = async(files) => { // [{name, data}]
  const zip = new JSZip();
  files.forEach(file => {
    zip.file(file.name, file.data);
  });
  const bin = await zip.generateAsync({ type: "arraybuffer" });
  return new Uint8Array(bin);
}
