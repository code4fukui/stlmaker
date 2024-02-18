import { makeUSDZBox } from "./makeUSDZBox.js";

const bin2 = await makeUSDZBox(2, 1, .1);
console.log(bin2)
await Deno.writeFile("box2.usdz", bin2);
//parse(data);
