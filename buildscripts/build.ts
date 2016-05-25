/**
 * Created by natsuki on 16/5/25.
 */

import shell = require("shelljs")
import admzip = require("adm-zip")
import fs = require("fs")

const target = "osx";
const electronPrebuiltDir = fs.readdirSync(`${__dirname}/../electron_prebuilt/${target}/`);
let zip;
for (const path of electronPrebuiltDir) {
    if (path.endsWith(".zip")) {
        zip = new admzip(`${__dirname}/../electron_prebuilt/${target}/${path}`);
        break;
    }
}

const outDir = `${__dirname}/../out/${target}/`;

shell.mkdir('-p', outDir);

zip.extractAllTo(outDir, true);

// let appDir;
// switch (target) {
//     case "osx":
//         appDir = `${__dirname}/../out/osx/Electron.app/Contents/Resources/app/`
// }
// shell.mkdir('-p', appDir);
//
// const toBeCopieds = fs.readdirSync("./");
// for (const outer of [".git", "buildscripts", "electron_prebuilt", "out", "typings", ".gitignore", "tsconfig.json", "typings.json", ".idea"]) {
//     if (toBeCopieds.indexOf(outer) > -1) {
//         toBeCopieds.splice(toBeCopieds.indexOf(outer), 1);
//     }
// }
// for (const name of toBeCopieds.filter(function (value: string, index, array) {
//     return !((value.endsWith(".ts")) || (value.endsWith(".js.map")))
// })) {
//     shell.cp('-r', `${__dirname}/../${name}`, appDir);    
// }
//
// const flPlugins = fs.readdirSync(`${appDir}/PepperFlash`);
// flPlugins.filter(function (value, index, array) {
//    return !(value == target);
// }).forEach(function (value, index) {
//     shell.rm("-rf", `${appDir}/PepperFlash/${value}`)
// });
//
