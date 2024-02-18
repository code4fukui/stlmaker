import { unzip } from "https://taisukef.github.io/zlib.js/es/unzip.js";
import { BinReader } from "./BinReader.js";

const parse = async (data) => {
  const zips = unzip(data);
  const fns = zips.getFilenames();
  console.log(fns);
  const usdc = fns.find(f => f.endsWith(".usdc"));
  if (!usdc) {
      return false;
  }
  const bin = zips.decompress(usdc);
  console.log("usdc", bin.length);
  const r = new BinReader(bin);
  const mark = r.readString(8);
  if (mark != "PXR-USDC") throw new Error("now USDC");
  for (let i = 0; i < 0x800 / 4; i++) {
    const n = r.readUint32();
    r.seek(-4);
    const m = r.readFloat32();
    console.log(i, n.toString(16), m);
  }
};

const data = await Deno.readFile("box.usdz");
parse(data);
