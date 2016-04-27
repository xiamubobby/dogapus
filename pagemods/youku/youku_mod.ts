/**
 * Created by natsuki on 16/4/27.
 */
///<reference path="../../lowdbinjection.js" />
var mutationObserver = new MutationObserver(function (mutations) {
    for (const mutation of mutations) {
        if (mutation.type == "childList" && mutation.addedNodes && mutation.addedNodes.length != 0) {
            for (var i = 0; i < mutation.addedNodes.length; i++) {
                const node = mutation.addedNodes[i]
                if (node.nodeName == "IFRAME") {
                    node.addEventListener("load", function (e) {
                        const info = loki.getSiteInfo("youku");
                        let passport = node.contentDocument.getElementById("passport");
                        passport.placeholder = "";
                        passport.value = info.account;
                        let password = node.contentDocument.getElementById("password");
                        password.addEventListener("change", function (e) {
                            console.log(e)
                        });
                        password.placeholder = "";
                        password.value = info.password;
                    });
                }
            }
        }
    }
});
mutationObserver.observe(document, {
    "childList": true,
    "subtree": true
});
