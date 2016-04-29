import WebViewElement = Electron.WebViewElement;
import WebViewElement = Electron.WebViewElement;
/**
 * Created by natsuki on 16/4/27.
 */
///<reference path="../../lowdbinjection.js" />
console.log("youku-mod loading")
var mutationObserver = new MutationObserver(function (mutations) {
    for (const mutation of mutations) {
        if (mutation.type == "childList" && mutation.addedNodes && mutation.addedNodes.length != 0) {
            for (var i = 0; i < mutation.addedNodes.length; i++) {
                const node = mutation.addedNodes[i]
                if (node.nodeName == "IFRAME") {
                    node.addEventListener("load", function (e) {
                        const info = loki.getSiteInfo("youku");
                        let passport: HTMLInputElement = <HTMLInputElement> ((<HTMLIFrameElement> node).contentDocument.getElementById("passport"));
                        passport.placeholder = "";
                        passport.value = info.account;
                        let password: HTMLInputElement = <HTMLInputElement> ((<HTMLIFrameElement> node).contentDocument.getElementById("password"));
                        password.placeholder = "";
                        password.value = info.password;
                    });
                }
                if (node.nodeName == "DIV") {
                    if (node.attributes.getNamedItem("id").value == "YT-loginFramePop") {
                        const info = loki.getSiteInfo("youku");
                        let yt_passport: HTMLInputElement = <HTMLInputElement> (document.getElementById("YT-ytaccount"));
                        yt_passport.placeholder = "";
                        yt_passport.value = info.account;
                        let yt_password: HTMLInputElement = <HTMLInputElement> (document.getElementById("YT-ytpassword"));
                        yt_password.placeholder = "";
                        yt_password.value = info.password;
                    }
                }
                if (node.attributes.getNamedItem("class")) {

                }
            }
        }
    }
});
mutationObserver.observe(document, {
    "childList": true,
    "subtree": true
});
console.log("youku-mod loaded");