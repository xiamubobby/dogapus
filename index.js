/**
 * Created by xiamubobby on 4/27/16.
 */
var pageMod = require("./pagemods/page_mod");
var theApp = require("./the_app");
let mainWebView = document.getElementById("mainwebview");
let cover = document.getElementById("cover");
let controls = document.getElementById("controlwebview");
controls.setAttribute("src", `file://${__dirname}/controls.html`);
mainWebView.setAttribute("preload", `file://${__dirname}/lowdbinjection.js`);
mainWebView.addEventListener("new-window", function (e) { mainWebView.loadURL(e.url); });
mainWebView.addEventListener("console-message", function (event) {
    // console.log(event.target);
    // console.log(event.message);
});
mainWebView.addEventListener("did-finish-load", function (event) {
    cover.style.display = "none";
    pageMod.modWebContent(event.target.getWebContents());
});
cover.addEventListener("transitionend", function (e) {
    if (cover.style.opacity == "0") {
        cover.style.display = "none";
    }
});
controls.style.transitionProperty = "transform";
controls.style.transitionDuration = "1.5s";
controls.style.transform = "translate(0px, -100%)";
controls.addEventListener("ipc-message", function (e) {
    switch (e.channel) {
        case "main-webview-loadurl":
            cover.style.display = "inline";
            cover.style.opacity = "1.0";
            if (e.args.length > 0) {
                try {
                    mainWebView.loadURL(e.args[0]);
                }
                catch (err) {
                    mainWebView.setAttribute("src", e.args[0]);
                }
            }
    }
});
[mainWebView, controls].forEach(function (webView) {
    webView.addEventListener("did-finish-load", function (event) {
        if (theApp.isDebug()) {
            event.target.getWebContents().openDevTools();
        }
    });
});
document.addEventListener("mousemove", function (e) {
    let y = e.clientY;
    let ratio = y / window.innerHeight;
    if (ratio <= 0.1 && e.clientX / window.innerWidth <= 0.2) {
        controls.style.transform = "translate(0px, 0px)";
    }
});
controls.addEventListener("mouseleave", function (e) {
    controls.style.transform = "translate(0px, -100%)";
});
//# sourceMappingURL=index.js.map