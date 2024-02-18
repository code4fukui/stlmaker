import { IEEE32 } from "https://code4fukui.github.io/IEEE754/IEEE32.js";
import { BinReader } from "./BinReader.js";
export class BinWriter extends BinReader {
  p = 0;
  constructor(n_or_bin = 1024, littleendian = true) {
    super(
      typeof n_or_bin == "number" ? new Uint8Array(n_or_bin) : n_or_bin,
      littleendian
    );
  }
  _extends() {
    const bin = new Uint8Array(this.bin.length * 2);
    for (let i = 0; i < this.bin.length; i++) {
      bin[i] = this.bin[i];
    }
    this.bin = bin;
    return this.bin;
  }
  writeUint32(n) {
    const p = this.p;
    let b = this.bin;
    if (p + 4 > b.length) b = this._extends();
    if (this.le) {
      b[p + 3] = n >> 24;
      b[p + 2] = n >> 16;
      b[p + 1] = n >> 8;
      b[p] = n;
      this.p += 4;
    } else {
      b[p] = n >> 24;
      b[p + 1] = n >> 16;
      b[p + 2] = n >> 8;
      b[p + 3] = n;
      this.p += 4;
    }
  }
  writeBytes(buf) {
    const p = this.p;
    let b = this.bin;
    while (p + buf.length > b.length) b = this._extends();
    for (let i = 0; i < buf.length; i++) {
      b[p + i] = buf[i];
    }
    this.p += buf.length;
  }
  writeString(s) {
    const bin = new TextEncoder().encode(s);
    this.writeBytes(bin);
  }
  writeFloat32(f) {
    if (!this.le) throw new Error("big endian not spported");
    const bin = IEEE32.encode([f]);
    this.writeBytes(bin);
  }
  toBytes() {
    const res = new Uint8Array(this.p);
    for (let i = 0; i < res.length; i++) {
      res[i] = this.bin[i];
    }
    return res;
  }
}
