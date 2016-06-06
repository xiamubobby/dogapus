/**
 * Created by natsuki on 16/5/25.
 */

import shell = require("shelljs")
import decompresszip = require("decompress-zip")
import fs = require("fs")

enum Targets {
    osx, win32, linux
}

for (const target of [Targets.osx, Targets.win32, Targets.linux]) {
    const electronPrebuiltDir = fs.readdirSync(`${__dirname}/../electron_prebuilt/${Targets[target]}/`);
    let zip;
    for (const path of electronPrebuiltDir) {
        if (path.endsWith(".zip")) {
            zip = new decompresszip(`${__dirname}/../electron_prebuilt/${Targets[target]}/${path}`);
            break;
        }
    }
   
    const outDir = `${__dirname}/../out/${Targets[target]}/`;
   
    shell.mkdir('-p', outDir);
   
    zip.extract({
        path: outDir
    });
   
    let appDir;
    switch (target) {
        case Targets.osx:
            appDir = `${__dirname}/../out/osx/Electron.app/Contents/Resources/app`;
            break;
        case Targets.win32:
            appDir = `${__dirname}/../out/win32/resources/app`;
            break;
        case Targets.linux:
            appDir = `${__dirname}/../out/linux/resources/app`;
    }
    shell.mkdir('-p', appDir);
    
    const toBeCopieds = fs.readdirSync("./");
    for (const outer of [".git", "buildscripts", "electron_prebuilt", "out", "typings", ".gitignore", "tsconfig.json", "typings.json", ".idea"]) {
        if (toBeCopieds.indexOf(outer) > -1) {
            toBeCopieds.splice(toBeCopieds.indexOf(outer), 1);
        }
    }
    for (const name of toBeCopieds.filter(function (value: string, index, array) {
        return !((value.endsWith(".ts")) || (value.endsWith(".js.map")))
    })) {
        shell.cp('-r', `${__dirname}/../${name}`, appDir);
    }
    
    const flPlugins = fs.readdirSync(`${appDir}/PepperFlash`);
    flPlugins.filter(function (value, index, array) {
       return !(value == Targets[target]);
    }).forEach(function (value, index) {
        shell.rm("-rf", `${appDir}/PepperFlash/${value}`)
    });
    //.split("/").slice(0, -1).join("/")
    console.log(appDir)
    shell.mkdir(`${appDir.split("/").slice(0, -1).join("/")}/PepperFlash`);
    shell.cp("-r", `${appDir}/PepperFlash/*`, `${appDir.split("/").slice(0, -1).join("/")}/PepperFlash`);
    shell.rm("-rf", `${appDir}/PepperFlash`);
}

