/**
 * Created by natsuki on 16/5/23.
 */

const loginButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("login-button");
const loginForm: HTMLFormElement = <HTMLFormElement> document.querySelector(".form");
import loki = require("./lokis/loki_manager")
import electron = require("electron")
import ipcSignals = require("./ipc_signals")
const Signals = ipcSignals.Signals;
import lokidb = require("./lokis/loki_manager")
import theApp = require("./the_app")
const siteDomains = theApp.SiteDomains;
const siteEnum = theApp.StreamSiteEnum;

const ipcRenderer = electron.ipcRenderer;

const loginPanel: HTMLDivElement = <HTMLDivElement> document.getElementById("loginpanel");
const categoryPanel: HTMLDivElement = <HTMLDivElement> document.getElementById("categorypanel");
const loadingknot: HTMLDivElement = <HTMLDivElement> document.getElementById("loadingknot");
const siteStrs = document.querySelectorAll("#categorypanel a");
loginPanel.fade = function () {
    let cb = function (event: TransitionEvent) {
        if (event.propertyName == "opacity") {
            this.style.display = "none";
            this.removeEventListener("transitionend", cb);
        }
    };
    this.addEventListener("transitionend", cb);
    this.style.opacity = 0;
    this.style.transform = "translate(0px, -50px)";
};
categoryPanel.show = function () {
    this.style.opacity = 1;
    this.style.transform = "translate(0px, 0px)";
};
categoryPanel.style.opacity = 0;
categoryPanel.style.transform = "translate(0px, -50px)";
    
loadingknot.shrink = function () {
  this.style.transform = "translate(-50%, -200%)"; 
};
loadingknot.expand = function () {
    this.style.transform = "translate(-50%, 250%)";
};

loginButton.addEventListener("click", function (event: Event) {
    console.log("login button pressed");
    login();
});
loginForm.addEventListener("keydown", function (event: KeyboardEvent) {
    if (event.keyCode  == 13) {
       console.log("enter pressed");
       login();
    }
});

function login() {
    loadingknot.expand();
    let account = (<HTMLInputElement> document.getElementById("username")).value;
    let password = (<HTMLInputElement> document.getElementById("password")).value;
    require("./protocols.js").interfaces.login(account, password, function(err, response, body) {
        loki.updateAccessToken(body.accessToken);
        loginPanel.fade();
        categoryPanel.show();
        ipcRenderer.sendToHost(Signals[Signals.LoginSuccess]);
        loadingknot.shrink();
    }, function() {loadingknot.shrink()});
}

document.getElementById("youku-button").addEventListener("click", function(){
    loadingknot.expand();
    require("./protocols.js").interfaces.getVideoAccount(require("./protocols.js").VideoType.YOUKU_TUDOU, function (err, request, body) {
        lokidb.updateSiteInfo("youku", body.account, body.password);
        ipcRenderer.sendToHost("main-webview-loadurl", "http://www.youku.com/");
    }, function () {});

});
document.getElementById("iqiyi-button").addEventListener("click", function(){
    loadingknot.expand();
    require("./protocols.js").interfaces.getVideoAccount(require("./protocols.js").VideoType.IQIYI, function (err, request, body) {
        lokidb.updateSiteInfo("iqiyi", body.account, body.password);
        ipcRenderer.sendToHost("main-webview-loadurl", "http://www.iqiyi.com/");
    }, function () {});
});
document.getElementById("sohu-button").addEventListener("click", function(){
    loadingknot.expand();
    require("./protocols.js").interfaces.getVideoAccount(require("./protocols.js").VideoType.SOHU, function (err, request, body) {
        lokidb.updateSiteInfo("sohu", body.account, body.password);
        ipcRenderer.sendToHost("main-webview-loadurl", "http://tv.sohu.com/");
    }, function () {});

});
document.getElementById("tudou-button").addEventListener("click", function(){
    loadingknot.expand();
    require("./protocols.js").interfaces.getVideoAccount(require("./protocols.js").VideoType.YOUKU_TUDOU, function (err, request, body) {
        lokidb.updateSiteInfo("tudou", body.account, body.password);
        ipcRenderer.sendToHost("main-webview-loadurl", "http://www.tudou.com/");
    }, function () {});

});
document.getElementById("tencent-button").addEventListener("click", function(){
    loadingknot.expand();
    require("./protocols.js").interfaces.getVideoAccount(require("./protocols.js").VideoType.QQ, function (err, request, body) {
        lokidb.updateSiteInfo("tencent", body.account, body.password);
        ipcRenderer.sendToHost("main-webview-loadurl", "http://v.qq.com/");
    }, function () {});

});
document.getElementById("letv-button").addEventListener("click", function(){
    loadingknot.expand();
    require("./protocols.js").interfaces.getVideoAccount(require("./protocols.js").VideoType.LETV, function (err, request, body) {
        lokidb.updateSiteInfo("letv", body.account, body.password);
        ipcRenderer.sendToHost("main-webview-loadurl", "http://www.le.com/");
    }, function () {});
});

// ipcRenderer.on(Signals[Signals.SetControlBackground], function (event, color) {
//     document.body.style.background = color;
//     for (const idx in siteStrs) {
//         if (siteStrs.hasOwnProperty(idx)) {
//             siteStrs[idx].style.color = ((color == "#222") ? "LimeGreen" : "red");
//         }
//     }
// });

ipcRenderer.on(Signals[Signals.NavigateToSite], function (event, site) {
    loadingknot.shrink();
    let backgroundColor = "";
    let fontColor = "";
    switch (site) {
        case siteDomains[siteEnum.YOUKU]:
            backgroundColor = "#ffffff";
            fontColor = "red";
            break;
        case siteDomains[siteEnum.TUDOU]:
            backgroundColor = "#ffffff";
            fontColor = "rgb(255, 102, 0)";
            break;
        case siteDomains[siteEnum.IQIYI]:
            backgroundColor = "#222";
            fontColor = "#699f00";
            break;
        case siteDomains[siteEnum.SOHU]:
            backgroundColor = "#f5f5f5";
            fontColor = "red";
            break;
        case siteDomains[siteEnum.TENCENT]:
            backgroundColor = "#ffffff";
            fontColor = "red";
            break;
        case siteDomains[siteEnum.LETV]:
            backgroundColor = "#f8f8f8";
            fontColor = "red";
            break;
    }
    document.body.style.background = backgroundColor;
    for (const idx in siteStrs) {
        if (siteStrs.hasOwnProperty(idx)) {
            siteStrs[idx].style.color = fontColor;
        }
    }
});

