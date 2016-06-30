/**
 * Created by natsuki on 16/4/28.
 */
///<reference path="../../indexinjections.ts" />

console.log("iqiyi-mod loading");
var mutationObserver = new MutationObserver(function (mutations) {
    for (const mutation of mutations) {
        if (mutation.type == "childList" && mutation.addedNodes && mutation.addedNodes.length != 0) {
            for (var i = 0; i < mutation.addedNodes.length; i++) {
                const node = mutation.addedNodes[i]
                if (node.nodeName == "DIV") {
                    if (node.id == "qipaLoginIfr") {
                        console.log("first")
                        const info = window.loki.getSiteInfo("iqiyi");
                        const email = node.querySelector("input[data-loginbox-elem='emailInput']");
                        email.placeholder = ""
                        email.value = info.account;//db("video").find({site: "iqiyi"}).account//"jb";
                        const passwd = node.querySelector("input[data-loginbox-elem='passwdInput'");
                        passwd.placeholder = ""
                        passwd.value = info.password;//db("video").find({site: "iqiyi"}).password//"penis";
                    }
                }
            }
        }
    }
});
mutationObserver.observe(document, {
    "childList": true,
    "subtree": true
});
console.log("iqiyi-mod loaded");
