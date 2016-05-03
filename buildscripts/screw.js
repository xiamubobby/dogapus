"use strict";
/**
 * Created by natsuki on 16/5/3.
 */
const unzip = require("unzip");
const fs = require("fs");
const CONFIG_1 = require("./CONFIG");
fs.createReadStream(`electron_prebuilt/${CONFIG_1.TARGET}/electron-v0.37.6-darwin-x64.zip`)
    .pipe(unzip.Extract({ path: `out/${CONFIG_1.TARGET}` }));
//# sourceMappingURL=screw.js.map