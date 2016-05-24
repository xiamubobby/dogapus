"use strict";
/**
 * Created by xiamubobby on 4/27/16.
 */
const pageMod = require("./pagemods/page_mod");
const theApp = require("./the_app");
const electron = require("electron");
const ipcRenderer = electron.ipcRenderer;
const ipcSignals = require("./ipc_signals");
const siteDomains = theApp.SiteDomains;
const siteEnum = theApp.StreamSiteEnum;
const Signals = ipcSignals.Signals;
let mainWebView = document.getElementById("mainwebview");
let controls = document.getElementById("controlwebview");
controls.shrink = function () {
    this.style.height = "60px";
};
controls.expand = function (callback = function () { }) {
    let cb = function (event) {
        if (controls.style.height == "100%") {
            callback();
            this.removeEventListener("transitionend", cb);
        }
    };
    this.addEventListener("transitionend", cb);
    if (this.style.height == "100%") {
        callback();
    }
    else {
        this.style.height = "100%";
    }
};
controls.addEventListener("ipc-message", function (event) {
    if (event.channel == Signals[Signals.LoginSuccess]) {
    }
});
controls.setAttribute("src", `file://${__dirname}/controls2.html`);
mainWebView.setAttribute("preload", `file://${__dirname}/lowdbinjection.js`);
mainWebView.addEventListener("new-window", function (e) { mainWebView.loadURL(e.url); });
mainWebView.addEventListener("console-message", function (event) {
});
// mainWebView.addEventListener("dom-ready", function (event) {
//     console.log(mainWebView.getURL())
//     if (mainWebView.getURL().indexOf(siteDomains[siteEnum.YOUKU]) >= 0) {
//         controls.send(Signals[Signals.SetControlBackground], "#ffffff");
//     } else if (mainWebView.getURL().indexOf(siteDomains[siteEnum.TUDOU]) >= 0) {
//         controls.send(Signals[Signals.SetControlBackground], "#ffffff");
//     } else if (mainWebView.getURL().indexOf(siteDomains[siteEnum.IQIYI]) >= 0) {
//         controls.send(Signals[Signals.SetControlBackground], "#222");
//     } else if (mainWebView.getURL().indexOf(siteDomains[siteEnum.SOHU]) >= 0) {
//         controls.send(Signals[Signals.SetControlBackground], "#f5f5f5");
//     } else if (mainWebView.getURL().indexOf(siteDomains[siteEnum.TENCENT]) >= 0) {
//         controls.send(Signals[Signals.SetControlBackground], "#ffffff");
//     } else if (mainWebView.getURL().indexOf(siteDomains[siteEnum.LETV]) >= 0) {
//         controls.send(Signals[Signals.SetControlBackground], "#f8f8f8");
//     }
//     controls.shrink();
//     pageMod.modWebContent((<WebViewElement> event.target).getWebContents());
// });
mainWebView.addEventListener("dom-ready", function (event) {
    console.log(mainWebView.getURL());
    if (mainWebView.getURL().indexOf(siteDomains[siteEnum.YOUKU]) >= 0) {
        controls.send(Signals[Signals.NavigateToSite], siteDomains[siteEnum.YOUKU]);
    }
    else if (mainWebView.getURL().indexOf(siteDomains[siteEnum.TUDOU]) >= 0) {
        controls.send(Signals[Signals.NavigateToSite], siteDomains[siteEnum.TUDOU]);
    }
    else if (mainWebView.getURL().indexOf(siteDomains[siteEnum.IQIYI]) >= 0) {
        controls.send(Signals[Signals.NavigateToSite], siteDomains[siteEnum.IQIYI]);
    }
    else if (mainWebView.getURL().indexOf(siteDomains[siteEnum.SOHU]) >= 0) {
        controls.send(Signals[Signals.NavigateToSite], siteDomains[siteEnum.SOHU]);
    }
    else if (mainWebView.getURL().indexOf(siteDomains[siteEnum.TENCENT]) >= 0) {
        controls.send(Signals[Signals.NavigateToSite], siteDomains[siteEnum.TENCENT]);
    }
    else if (mainWebView.getURL().indexOf(siteDomains[siteEnum.LETV]) >= 0) {
        controls.send(Signals[Signals.NavigateToSite], siteDomains[siteEnum.LETV]);
    }
    controls.shrink();
    pageMod.modWebContent(event.target.getWebContents());
});
controls.expand();
controls.addEventListener("ipc-message", function (e) {
    switch (e.channel) {
        case "main-webview-loadurl":
            controls.expand(function (event) {
                if (e.args.length > 0) {
                    try {
                        mainWebView.loadURL(e.args[0]);
                    }
                    catch (err) {
                        mainWebView.setAttribute("src", e.args[0]);
                    }
                }
            });
    }
});
[mainWebView, controls].forEach(function (webView) {
    webView.addEventListener("did-finish-load", function (event) {
        if (theApp.isDebug()) {
            event.target.getWebContents().openDevTools();
        }
    });
});
//# sourceMappingURL=index.js.map