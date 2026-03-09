/* @ts-self-types="./miner.d.ts" */

import * as wasm from "./miner_bg.wasm";
import { __wbg_set_wasm } from "./miner_bg.js";
__wbg_set_wasm(wasm);
wasm.__wbindgen_start();
export {
    mine
} from "./miner_bg.js";
