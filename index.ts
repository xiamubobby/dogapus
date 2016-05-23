/**
 * Created by xiamubobby on 4/27/16.
 */
import pageMod = require("./pagemods/page_mod")
import WebViewElement = Electron.WebViewElement;
import theApp = require("./the_app")
import electron  = require("electron")
const ipcRenderer = electron.ipcRenderer;
import ipcSignals = require("./ipc_signals")
const Signals = ipcSignals.Signals;

let mainWebView: WebViewElement = <WebViewElement> document.getElementById("mainwebview");
// let cover: HTMLDivElement = <HTMLDivElement> document.getElementById("cover");
let controls: WebViewElement = <WebViewElement> document.getElementById("controlwebview");
controls.shrink = function () {
    this.style.height = "60px";
};
controls.expand = function (callback?: Function = function () {}) {
    let cb = function (event) {
        callback();
        this.removeEventListener("transitionend", cb);
    };
    this.addEventListener("transitioned", cb)
    if (this.style.height == "100%") {
        callback();
    } else {
        this.style.height = "100%";
    }
};
controls.addEventListener("ipc-message", function (event) {
   if(event.channel == Signals[Signals.LoginSuccess]) {
       // controls.shrink();
   }
});

controls.setAttribute("src", `file://${__dirname}/controls2.html`);
mainWebView.setAttribute("preload", `file://${__dirname}/lowdbinjection.js`);

mainWebView.addEventListener("new-window", function(e){ mainWebView.loadURL(e.url) });
mainWebView.addEventListener("console-message", function (event) {
    // console.log(event.target);
    // console.log(event.message);
});
mainWebView.addEventListener("did-finish-load", function (event) {
    // cover.style.display = "none";
    controls.shrink();
    pageMod.modWebContent((<WebViewElement> event.target).getWebContents());
});

// cover.addEventListener("transitionend", function (e) {
//     if (cover.style.opacity == "0") {
//         cover.style.display = "none";
//     }
// });

//controls.style.transform = "translate(0px, -100%)";
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
            // cover.style.display = "inline";
            // cover.style.opacity = "1.0";
    }
});

[mainWebView, controls].forEach(function (webView: WebViewElement) {
    webView.addEventListener("did-finish-load", function (event) {
        if (theApp.isDebug()) {
            (<WebViewElement> event.target).getWebContents().openDevTools();
        }
    });
});

// document.addEventListener("mousemove", function(e){
//     let y = e.clientY;
//     let ratio = y / window.innerHeight;
//     if (ratio <= 0.1 && e.clientX / window.innerWidth <= 0.2) {
//         controls.style.transform = "translate(0px, 0px)";
//     }
// });

// controls.addEventListener("mouseleave", function(e){
//     controls.style.transform = "translate(0px, -100%)";
// });

