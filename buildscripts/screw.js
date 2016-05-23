"use strict";
const CONFIG_1 = require("./CONFIG");
const cp = require('child_process');
const exec = cp.exec;
let unzipCommand = `unzip -f -o electron_prebuilt/${CONFIG_1.TARGET}/electron-v0.37.6-darwin-x64.zip -d out/${CONFIG_1.TARGET}`;
exec(unzipCommand, function (error, stdout, stderr) {
});
//# sourceMappingURL=screw.js.map