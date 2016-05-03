/**
 * Created by natsuki on 16/5/3.
 */
import unzip = require("unzip");
import fs = require("fs");
import asar = require("asar");
import glob = require("glob");
import fse = require("fs-extra");


import {ROOT_PATH, TARGET} from "./CONFIG";

fs.createReadStream(`electron_prebuilt/${TARGET}/electron-v0.37.6-darwin-x64.zip`)
    .pipe(unzip.Extract({ path: `out/${TARGET}` }));
