import { unzip } from "https://taisukef.github.io/zlib.js/es/unzip.js";
import { BinReader } from "./BinReader.js";
import { LZ4 } from "https://code4fukui.github.io/LZ4/LZ4.js";
//import { LZ4 } from "../../util/LZ4/LZ4.js";

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
  const ver = r.readUint64();
  console.log("ver", ver.toString(16), "known", 0x800n);
  const tocoffset = r.readUint64();
  console.log("tocoffset", tocoffset);
  const sections = [];
  r.skip(tocoffset - 16n);
  for (;;) {
    try {
      const name = r.readString(16);
      console.log(name);
      const start = r.readUint64();
      const size = r.readUint64();
      console.log("section", name, start, size);
      sections.push({ name, start, size })
    } catch (e) {
      break;
    }
  }

  for (const section of sections) {
    r.seekTo(section.start);
    const name = section.name;
    console.log(name);
    if (name == "TOKENS") {
      const num = r.readUint64();
      const size = r.readUint64();
      const packsize = r.readUint64();
      console.log(num, size, packsize);
      const b = r.readBytes(packsize);
      console.log(num, size, packsize);
      const bin = LZ4.decompress(b);
      console.log(bin, bin.length);
    } else if (name == "STRINGS") {
      console.log("STRIGS", section.size);
      const num = r.readUint64();
      for (let i = 0n; i < num; i++) {
        const idx = r.readUint32();
        console.log("STRINGS", i, "/", num, idx);
      }
    } else if (name == "FIELDS") {
      const num = r.readUint64();
      const size = r.readUint64();
      //const b = r.readBytes(section.size - 16n);
      const b = r.readBytes(size);
      console.log(num, size, b.length);
      //const bin = LZ4.decompress(b); // 211f000
      //console.log(bin, bin.length);
    } else if (name == "FIELDSETS") {
      const num = r.readUint64();
      const size = r.readUint64();
      const b = r.readBytes(section.size - 16n);
      //const b = r.readBytes(size);
      console.log(num, size, b.length);
      //const bin = LZ4.decompress(b); // 11bf000
      //console.log(bin, bin.length);
    } else if (name == "PATHS") {
    } else if (name == "SPECS") {
      const num = r.readUint64();
      console.log("num" ,num, section.size  );
      for (let i = 0; i < num; i++) {
        const n = r.readUint64();
        console.log(i, n);
      }

    
    } else {
      const size = Number(section.size);
      for (let i = 0; i < size / 4; i++) {
        const n = r.readUint32();
        r.seek(-4);
        const m = r.readFloat32();
        console.log(i, n.toString(16), m);
      }
    }
  }
  for (let i = 0; i < 0x800 / 4; i++) {
    const n = r.readUint32();
    r.seek(-4);
    const m = r.readFloat32();
    console.log(i, n.toString(16), m);
  }
};

const data = await Deno.readFile("box.usdz");
parse(data);
