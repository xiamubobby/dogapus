"use strict";
const CONFIG_1 = require("./CONFIG");
const cp = require('child_process');
const exec = cp.exec;
let unzipCommand = `unzip -f -o electron_prebuilt/${CONFIG_1.TARGET}/electron-v0.37.6-darwin-x64.zip -d out/${CONFIG_1.TARGET}`;
let copy = ``;
exec(unzipCommand, function (error, stdout, stderr) {
    // console.log([error, stdout, stderr])
});
exec("glob *.js", function (err, so, se) {
    console.log([err, so, se]);
});
// fs.createReadStream(`electron_prebuilt/${TARGET}/electron-v0.37.6-darwin-x64.zip`)
//     .pipe(unzip.Extract({ path: `out/${TARGET}` }));
// unzip -f -o electron_prebuilt/osx/electron-v0.37.6-darwin-x64.zip -d out/osx
//# sourceMappingURL=screw.js.map