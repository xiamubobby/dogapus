"use strict";
const fs = require("fs");
const glob = require("glob");
const fse = require("fs-extra");
const CONFIG_1 = require("./CONFIG");
let resourcePath = "";
switch (CONFIG_1.TARGET) {
    case "osx":
        resourcePath = "out/osx/Electron.app/Contents/Resources";
}
glob(`PepperFlash/${CONFIG_1.TARGET}`, {}, function (err, files) {
    for (const file of files) {
        fse.copySync(file, `${resourcePath}/${file}`);
    }
});
fse.emptyDirSync(`${resourcePath}/app`);
fs.rmdirSync(`${resourcePath}/app`);
//# sourceMappingURL=daf.js.map