/**
 * Created by natsuki on 16/5/3.
 */
import unzip = require("unzip");
import fs = require("fs");
import asar = require("daf");
import glob = require("glob");
import fse = require("fs-extra");


import {ROOT_PATH, TARGET} from "./CONFIG";

import cp =  require('child_process');
const exec = cp.exec;

let unzipCommand = `unzip -f -o electron_prebuilt/${TARGET}/electron-v0.37.6-darwin-x64.zip -d out/${TARGET}`;
 
exec(unzipCommand, function(error, stdout, stderr) {
});