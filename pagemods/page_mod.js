"use strict";
/**
 * Created by natsuki on 16/4/26.
 */
const app_1 = require("../app");
const fs = require("fs");
class PageMod {
    constructor(pattern, filenames) {
        this.pattern = pattern;
        this.filenames = filenames;
    }
}
var pageModes = {};
for (const site of app_1.StreamSites) {
    const siteName = app_1.StreamSiteEnum[site];
    const files = fs.readdirSync(`${__dirname}/${siteName.toLowerCase()}`);
    pageModes[siteName] = new PageMod((url) => url.includes(siteName.toLowerCase()), files.filter((element) => element.endsWith(".js")));
}
function modWebContent(webContent) {
    for (const siteName in pageModes) {
        if (pageModes.hasOwnProperty(siteName)) {
            const pageMod = pageModes[siteName];
            if (pageMod && pageMod.pattern(webContent.getURL())) {
                for (const fileName of pageMod.filenames) {
                    webContent.executeJavaScript(fs.readFileSync(`${__dirname}/${siteName.toLowerCase()}/${fileName}`, { encoding: "utf-8" }));
                }
            }
        }
    }
}
exports.modWebContent = modWebContent;
var dd = {
    getURL: function () {
        return "www.youku.com";
    },
    executeJavaScript: function (str) {
        console.log(str);
    }
};
modWebContent(dd);
//# sourceMappingURL=page_mod.js.map