import { unzip } from "https://taisukef.github.io/zlib.js/es/unzip.js";
import { BinWriter } from "./BinWriter.js";
import { zip } from "./zip.js";

const readOrFetch = async (fn) => {
  if (globalThis.Deno) return await Deno.readFile(fn);
  return new Uint8Array(await (await fetch(fn)).arrayBuffer());
};

export const makeUSDZBox = async (width, height, depth) => {
  const data = await readOrFetch("box.usdz");
  const zips = unzip(data);
  const fns = zips.getFilenames();
  //console.log(fns);
  const usdc = fns.find(f => f.endsWith(".usdc"));
  if (!usdc) {
      return false;
  }
  const bin = zips.decompress(usdc);
  //console.log("usdc", bin.length);
  const w = new BinWriter(bin);
  const mark = w.readString(8);
  if (mark != "PXR-USDC") throw new Error("now USDC");
  w.seek(64 * 4);
  const n = w.readUint32();
  w.readUint32();
  //console.log("n", n);
  const whd = [width, depth, height];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < 3; j++) {
      const f = w.readFloat32();
      //console.log(i, f);
      w.seek(-4);
      w.writeFloat32(f * whd[j] / 2);
    }
  }
  w.seekTo(bin.length);
  const bin2 = w.toBytes();
  return await zip([{ name: usdc, data: bin2 }])
};
