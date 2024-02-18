import { IEEE32 } from "https://code4fukui.github.io/IEEE754/IEEE32.js";

export class BinReader {
  p = 0;
  constructor(bin, littleendian = true) {
    this.bin = bin;
    this.le = littleendian;
  }
  readUint32() {
    const p = this.p;
    const b = this.bin;
    if (p + 4 > b.length) throw new Error("EOF");
    if (this.le) {
      const res = (b[p + 3] << 24) | (b[p + 2] << 16) | (b[p + 1] << 8) | b[p];
      this.p += 4;
      return res;
    } else {
      const res = (b[p] << 24) | (b[p + 1] << 16) | (b[p + 2] << 8) | b[p + 3];
      this.p += 4;
      return res;
    }
  }
  readBytes(n) {
    const p = this.p;
    const b = this.bin;
    if (p + n > b.length) throw new Error("EOF");
    const res = new Uint8Array(n);
    for (let i = 0; i < n; i++) {
      res[i] = b[p + i];
    }
    this.p += n;
    return res;
  }
  readString(n) {
    return new TextDecoder().decode(this.readBytes(n));
  }
  readFloat32() {
    if (!this.le) throw new Error("big endian not spported");
    const bin = this.readBytes(4);
    const f32array = IEEE32.decode(bin);
    return f32array[0];
  }
  seek(offset) {
    const p = this.p + offset;
    const b = this.bin;
    if (p < 0) throw new Error("seek point is minus");
    if (p > b.length) throw new Error("EOF");
    this.p = p;
  }
  seekTo(p) {
    const b = this.bin;
    if (p < 0) throw new Error("seek point is minus");
    if (p > b.length) throw new Error("EOF");
    this.p = p;
  }
}
