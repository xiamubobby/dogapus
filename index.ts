/**
 * Created by xiamubobby on 4/27/16.
 */
import pageMod = require("./pagemods/page_mod")
import WebViewElement = Electron.WebViewElement;
import theApp = require("./the_app")
import electron  = require("electron")
const ipcRenderer = electron.ipcRenderer;
import ipcSignals = require("./ipc_signals")
const siteDomains = theApp.SiteDomains;
const siteEnum = theApp.StreamSiteEnum;
const Signals = ipcSignals.Signals;

let mainWebView: WebViewElement = <WebViewElement> document.getElementById("mainwebview");
let controls: WebViewElement = <WebViewElement> document.getElementById("controlwebview");

controls.shrink = function () {
    this.style.height = "60px";
};
controls.expand = function (callback: Function = function () {}) {
    let cb = function (event) {
        if (controls.style.height == "100%") {
            callback();
            this.removeEventListener("transitionend", cb);
        }
    };
    if (this.style.height == "100%") {
        callback();
    } else {
        this.addEventListener("transitionend", cb);
        this.style.height = "100%";
    }
};

controls.addEventListener("ipc-message", function (event) {
   if(event.channel == Signals[Signals.LoginSuccess]) {
   }
});

controls.setAttribute("src", `file://${__dirname}/controls2.html`);
mainWebView.setAttribute("preload", `file://${__dirname}/indexinjections.js`);

mainWebView.addEventListener("new-window", function(e){ mainWebView.loadURL(e.url) });
mainWebView.addEventListener("console-message", function (event) {
});

ipcRenderer.on(ipcSignals.Signals[ipcSignals.Signals.AlertOnRenderer], (event, message) => {
    alert(message);
    controls.expand();
    controls.send(ipcSignals.Signals[ipcSignals.Signals.ResetControls]);
});

mainWebView.addEventListener("dom-ready"/*"dom-ready"*/, function (event) {
    pageMod.modWebContent((<WebViewElement> event.target).getWebContents(), ()=>{
        if (mainWebView.getURL().indexOf(siteDomains[siteEnum.YOUKU]) >= 0) {
            controls.send(Signals[Signals.NavigateToSite], siteDomains[siteEnum.YOUKU]);
        } else if (mainWebView.getURL().indexOf(siteDomains[siteEnum.TUDOU]) >= 0) {
            controls.send(Signals[Signals.NavigateToSite], siteDomains[siteEnum.TUDOU]);
        } else if (mainWebView.getURL().indexOf(siteDomains[siteEnum.IQIYI]) >= 0) {
            controls.send(Signals[Signals.NavigateToSite], siteDomains[siteEnum.IQIYI]);
        } else if (mainWebView.getURL().indexOf(siteDomains[siteEnum.SOHU]) >= 0) {
            controls.send(Signals[Signals.NavigateToSite], siteDomains[siteEnum.SOHU]);
        } else if (mainWebView.getURL().indexOf(siteDomains[siteEnum.TENCENT]) >= 0) {
            controls.send(Signals[Signals.NavigateToSite], siteDomains[siteEnum.TENCENT]);
        } else if (mainWebView.getURL().indexOf(siteDomains[siteEnum.LETV]) >= 0) {
            controls.send(Signals[Signals.NavigateToSite], siteDomains[siteEnum.LETV]);
        }
        controls.shrink();
    });
});

controls.expand();

controls.addEventListener("ipc-message", function (e) {
    switch (e.channel) {
        case "main-webview-loadurl":
            controls.expand(function (event) {
                if (e.args.length > 0 ) {
                    try {
                        mainWebView.loadURL(e.args[0]);
                    } catch(err) {
                        mainWebView.setAttribute("src", e.args[0]);
                    }
                }
            });
    }
});

[mainWebView, controls].forEach(function (webView: WebViewElement) {
    webView.addEventListener("load-commit"/*"dom-ready"*/, function (event) {
        if (theApp.isDebug()) {
            (<WebViewElement> event.target).getWebContents().openDevTools();
        }
    });
});

