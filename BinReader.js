import { IEEE32 } from "https://code4fukui.github.io/IEEE754/IEEE32.js";

export class BinReader {
  p = 0;
  constructor(bin, littleendian = true) {
    this.bin = bin;
    this.le = littleendian;
  }
  readUint8() {
    if (this.p + 1 > this.bin.length) throw new Error("EOF");
    return this.bin[this.p++];
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
  readUint64() {
    if (!this.le) throw new Error("big endian not spported");
    const n1 = this.readUint32();
    const n2 = this.readUint32();
    return BigInt(n1) | (BigInt(n2) << 32n);
  }
  readBytes(n) {
    n = this._cast(n);
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
    const s = new TextDecoder().decode(this.readBytes(n));
    const np = s.indexOf("\0");
    if (np >= 0) return s.substring(0, np);
    return s;
  }
  readFloat32() {
    if (!this.le) throw new Error("big endian not spported");
    const bin = this.readBytes(4);
    const f32array = IEEE32.decode(bin);
    return f32array[0];
  }
  seek(offset) {
    offset = this._cast(offset);
    const p = this.p + offset;
    const b = this.bin;
    if (p < 0) throw new Error("seek point is minus");
    if (p > b.length) throw new Error("EOF");
    this.p = p;
  }
  skip(offset) {
    this.seek(offset);
  }
  seekTo(p) {
    p = this._cast(p);
    const b = this.bin;
    if (p < 0) throw new Error("seek point is minus");
    if (p > b.length) throw new Error("EOF");
    this.p = p;
  }
  _cast(p) {
    if (typeof p != "bigint") return p;
    if (p > BigInt(Number.MAX_SAFE_INTEGER)) {
      throw new Error("bigint not supported yet");
    }
    return Number(p);
  }
}
