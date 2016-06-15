"use strict";
/**
 * Created by natsuki on 16/4/26.
 */
const the_app_1 = require("../the_app");
const fs = require("fs");
class PageMod {
    constructor(pattern, filenames) {
        this.pattern = pattern;
        this.filenames = filenames;
    }
}
var pageModes = {};
for (const site of the_app_1.StreamSites) {
    const siteName = the_app_1.StreamSiteEnum[site];
    const files = fs.readdirSync(`${__dirname}/${siteName.toLowerCase()}`);
    pageModes[siteName] = new PageMod((url) => url.includes(the_app_1.SiteDomains[site]), files.filter((element) => element.endsWith(".js")));
}
function modWebContent(webContent, cb) {
    for (const siteName in pageModes) {
        if (pageModes.hasOwnProperty(siteName)) {
            const pageMod = pageModes[siteName];
            console.log(webContent.getURL());
            if (pageMod && pageMod.pattern(webContent.getURL())) {
                console.log("im in!");
                for (const fileName of pageMod.filenames) {
                    console.log(fileName);
                    webContent.executeJavaScript(fs.readFileSync(`${__dirname}/${siteName.toLowerCase()}/${fileName}`, { encoding: "utf-8" }), false, function (result) {
                        console.log(cb.toString);
                        if (cb)
                            cb();
                    });
                    console.log("executeee!");
                }
            }
        }
    }
}
exports.modWebContent = modWebContent;
//# sourceMappingURL=page_mod.js.map