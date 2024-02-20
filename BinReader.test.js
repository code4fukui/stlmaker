import * as t from "https://deno.land/std/testing/asserts.ts";
import { BinReader } from "./BinReader.js";
import { IEEE32 } from "https://code4fukui.github.io/IEEE754/IEEE32.js";

Deno.test("simple", () => {
  const bin = new Uint8Array([1, 0, 0, 0]);
  const r = new BinReader(bin);
  t.assertEquals(r.readUint32(), 1);
});
Deno.test("2 values", () => {
  const bin = new Uint8Array([1, 0, 0, 0, 2, 0xff, 0x12, 0x44]);
  const r = new BinReader(bin);
  t.assertEquals(r.readUint32(), 1);
  t.assertEquals(r.readUint32(), 0x4412ff02);
});
Deno.test("2 values big endian", () => {
  const bin = new Uint8Array([1, 0, 0, 0, 2, 0xff, 0x12, 0x44]);
  const r = new BinReader(bin, false);
  t.assertEquals(r.readUint32(), 0x01000000);
  t.assertEquals(r.readUint32(), 0x02ff1244);
});
Deno.test("EOF", () => {
  const bin = new Uint8Array([1, 0, 0, 0, 2, 0xff, 0x12, 0x44, 1, 2, 3]);
  const r = new BinReader(bin);
  t.assertEquals(r.readUint32(), 1);
  t.assertEquals(r.readUint32(), 0x4412ff02);
  t.assertThrows(() => r.readUint32());
});
Deno.test("readBytes", () => {
  const bin = new Uint8Array([1, 0, 0, 0, 2, 0xff, 0x12, 0x44, 1, 2, 3]);
  const r = new BinReader(bin);
  t.assertEquals(r.readBytes(2), new Uint8Array([1, 0]));
  t.assertEquals(r.readBytes(4), new Uint8Array([0, 0, 2, 0xff]));
});
Deno.test("readString", () => {
  const bin = new Uint8Array([80, 88]);
  const r = new BinReader(bin);
  t.assertEquals(r.readString(2), "PX");
});
Deno.test("readFloat32", () => {
  const bin = IEEE32.encode([1, .5, .25]);
  const r = new BinReader(bin);
  t.assertEquals(r.readFloat32(), 1);
  t.assertEquals(r.readFloat32(), .5);
  t.assertEquals(r.readFloat32(), .25);
});
Deno.test("seek", () => {
  const bin = IEEE32.encode([1, .5, .25]);
  const r = new BinReader(bin);
  t.assertEquals(r.readFloat32(), 1);
  r.seek(-4);
  t.assertEquals(r.readFloat32(), 1);
  r.seek(4);
  //t.assertEquals(r.readFloat32(), .5);
  t.assertEquals(r.readFloat32(), .25);
  r.seekTo(4);
  t.assertEquals(r.readFloat32(), .5);
  t.assertEquals(r.readFloat32(), .25);
});
Deno.test("bigint", () => {
  const bin = new Uint8Array([
    1, 0, 0, 0, 2, 0xff, 0x12, 0x44,
    1, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const r = new BinReader(bin);
  t.assertEquals(r.readUint64(), 0x4412ff0200000001n);
  t.assertEquals(r.readUint64(), 1n);
});
Deno.test("readUint8", () => {
  const bin = new Uint8Array([
    1, 2, 0xff
  ]);
  const r = new BinReader(bin);
  t.assertEquals(r.readUint8(), 1);
  t.assertEquals(r.readUint8(), 2);
  t.assertEquals(r.readUint8(), 0xff);
});
