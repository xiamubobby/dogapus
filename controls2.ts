/**
 * Created by natsuki on 16/5/23.
 */
// document.querySelector("#login-button").addEventListener("click", function (event: Event) {
//     event.preventDefault();
//     document.querySelector("form");
//     let wrapper = document.querySelector(".wrapper");
//     wrapper.setAttribute("class", wrapper.getAttribute("class") + "form-success");
// });

const loginButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("login-button");
const loginForm: HTMLFormElement = <HTMLFormElement> document.querySelector(".form");
import loki = require("./lokis/loki_manager")
import electron = require("electron")
import ipcSignals = require("./ipc_signals")
const Signals = ipcSignals.Signals;
import lokidb = require("./lokis/loki_manager")

const ipcRenderer = electron.ipcRenderer;

const loginPanel: HTMLDivElement = <HTMLDivElement> document.getElementById("loginpanel");
const categoryPanel: HTMLDivElement = <HTMLDivElement> document.getElementById("categorypanel");
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

loginButton.addEventListener("click", function (event: Event) {
    console.log("login button pressed");
    login();
});
loginForm.addEventListener("keydown", function (event: KeyboardEvent) {
   if (event.key == "enter") {
       console.log("enter pressed");
       login();
   }
});

function login() {
    let account = (<HTMLInputElement> document.getElementById("username")).value;
    let password = (<HTMLInputElement> document.getElementById("password")).value;
    require("./protocols.js").interfaces.login(account, password, function(err, response, body) {
        loki.updateAccessToken(body.accessToken);
        loginPanel.fade();
        categoryPanel.show();
        ipcRenderer.sendToHost(Signals[Signals.LoginSuccess]);
    });
}

document.getElementById("youku-button").addEventListener("click", function(){
    require("./protocols.js").interfaces.getVideoAccount(require("./protocols.js").VideoType.YOUKU_TUDOU, function (err, request, body) {
        lokidb.updateSiteInfo("youku", body.account, body.password);
        ipcRenderer.sendToHost("main-webview-loadurl", "http://www.youku.com/")
    });

});
document.getElementById("iqiyi-button").addEventListener("click", function(){
    require("./protocols.js").interfaces.getVideoAccount(require("./protocols.js").VideoType.IQIYI, function (err, request, body) {
        lokidb.updateSiteInfo("iqiyi", body.account, body.password);
        ipcRenderer.sendToHost("main-webview-loadurl", "http://www.iqiyi.com/");
    });
});
document.getElementById("sohu-button").addEventListener("click", function(){
    require("./protocols.js").interfaces.getVideoAccount(require("./protocols.js").VideoType.SOHU, function (err, request, body) {
        lokidb.updateSiteInfo("sohu", body.account, body.password);
        ipcRenderer.sendToHost("main-webview-loadurl", "http://tv.sohu.com/");
    });

});
document.getElementById("tudou-button").addEventListener("click", function(){
    require("./protocols.js").interfaces.getVideoAccount(require("./protocols.js").VideoType.YOUKU_TUDOU, function (err, request, body) {
        lokidb.updateSiteInfo("tudou", body.account, body.password);
        ipcRenderer.sendToHost("main-webview-loadurl", "http://www.tudou.com/");
    });

});
document.getElementById("tencent-button").addEventListener("click", function(){
    require("./protocols.js").interfaces.getVideoAccount(require("./protocols.js").VideoType.QQ, function (err, request, body) {
        lokidb.updateSiteInfo("tencent", body.account, body.password);
        ipcRenderer.sendToHost("main-webview-loadurl", "http://v.qq.com/");
    });

});
document.getElementById("letv-button").addEventListener("click", function(){
    require("./protocols.js").interfaces.getVideoAccount(require("./protocols.js").VideoType.LETV, function (err, request, body) {
        lokidb.updateSiteInfo("letv", body.account, body.password);
        ipcRenderer.sendToHost("main-webview-loadurl", "http://www.le.com/");
    });
});