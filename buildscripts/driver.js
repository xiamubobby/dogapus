"use strict";
const glob = require("glob");
const fse = require("fs-extra");
const CONFIG_1 = require("./CONFIG");
let resourcePath = "";
switch (CONFIG_1.TARGET) {
    case "osx":
        resourcePath = "out/osx/Electron.app/Contents/Resources";
}
glob("!(node_modules|electron_prebuilt|PepperFlash|buildscripts|out|tools|typings|*.ts|*.js.map|tsconfig.json|typings.json|gulpfile.js|*.asar)", {}, function (err, files) {
    for (const file of files) {
        fse.copySync(file, `${resourcePath}/app/${file}`);
    }
});
glob("!(node_modules|electron_prebuilt|PepperFlash|buildscripts|out|tools|typings)/**/!(*.ts|*.js.map|tsconfig.json|typings.json|gulpfile.js|*.asar)", {}, function (err, files) {
    for (const file of files) {
        fse.copySync(file, `${resourcePath}/app/${file}`);
    }
});
glob("node_modules/lokijs", {}, function (err, files) {
    for (const file of files) {
        fse.copySync(file, `${resourcePath}/app/${file}`);
    }
});
glob("node_modules/request", {}, function (err, files) {
    for (const file of files) {
        fse.copySync(file, `${resourcePath}/app/${file}`);
    }
});
//# sourceMappingURL=driver.js.map