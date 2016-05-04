"use strict";
const asar = require("asar");
const CONFIG_1 = require("./CONFIG");
let resourcePath = "";
switch (CONFIG_1.TARGET) {
    case "osx":
        resourcePath = "out/osx/Electron.app/Contents/Resources";
}
asar.createPackageWithOptions(`${resourcePath}/app`, `${resourcePath}/app.asar`, { "unpack-dir": "PepperFlash" }, function () {
});
//# sourceMappingURL=box.js.map