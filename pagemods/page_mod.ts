/**
 * Created by natsuki on 16/4/26.
 */
import {StreamSiteEnum, StreamSites, SiteDomains} from "../the_app";
import fs = require("fs");
import electron = require("electron")
import WebContents = Electron.WebContents;

class PageMod {
    constructor(public pattern:(url: string)=>boolean, public filenames: string[]) {

    }
}
var pageModes: {[key: string]: PageMod} = {};
for (const site of StreamSites) {
    const siteName = StreamSiteEnum[site];
    const files = fs.readdirSync(`${__dirname}/${siteName.toLowerCase()}`);
    pageModes[siteName] = new PageMod((url)=>url.includes(SiteDomains[site]), files.filter((element)=>element.endsWith(".js")));
}

export function modWebContent(webContent: WebContents, cb) {
    for (const siteName in pageModes) {
        if (pageModes.hasOwnProperty(siteName)) {
            const pageMod = pageModes[siteName];
            console.log(webContent.getURL())
            if (pageMod && pageMod.pattern(webContent.getURL())) {
                for (const fileName of pageMod.filenames) {
                    webContent.executeJavaScript(fs.readFileSync(`${__dirname}/${siteName.toLowerCase()}/${fileName}`, {encoding: "utf-8"}), false, function(result) {
                        if (cb) cb();
                    });
                }
            }
        }
    }
}   