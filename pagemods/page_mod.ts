/**
 * Created by natsuki on 16/4/26.
 */
import {StreamSiteEnum, StreamSites} from "../app";
import fs = require("fs");

class PageMod {
    constructor(public pattern:(url: string)=>boolean, public filenames: string[]) {

    }
}

var pageModes: {[key: string]: PageMod} = {};
for (const site of StreamSites) {
    const siteName = StreamSiteEnum[site];
    const files = fs.readdirSync(`${__dirname}/${siteName.toLowerCase()}`);
    pageModes[siteName] = new PageMod((url)=>url.includes(siteName.toLowerCase()), files.filter((element)=>element.endsWith(".js")));
}

export function modWebContent(webContent) {
    for (const siteName in pageModes) {
        if (pageModes.hasOwnProperty(siteName)) {
            const pageMod = pageModes[siteName]
            if (pageMod && pageMod.pattern(webContent.getURL())) {
                for (const fileName of pageMod.filenames) {
                    webContent.executeJavaScript(fs.readFileSync(`${__dirname}/${siteName.toLowerCase()}/${fileName}`, {encoding: "utf-8"}))
                }
            }
        }
    }
}

var dd = {
    getURL: function () {
        return "www.youku.com"
    },
    executeJavaScript: function (str) {
        console.log(str)
    }
}

modWebContent(dd)