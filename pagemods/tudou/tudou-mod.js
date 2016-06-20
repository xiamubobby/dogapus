/**
 * Created by natsuki on 16/4/28.
 */
///<refrence path="../../indexinjections.ts />
console.log("tudou-mod loading");
var mutationObserver = new MutationObserver(function (mutations) {
    for (const mutation of mutations) {
        if (mutation.type == "childList" && mutation.addedNodes && mutation.addedNodes.length != 0) {
            for (var i = 0; i < mutation.addedNodes.length; i++) {
                const node = mutation.addedNodes[i];
                if (node.nodeName == "DIV") {
                    var result = true;
                    for (const clazz of ["tui_dialog", "tudou_dialog", "login_dialog", "log_dialog"]) {
                        if (!node.classList.contains(clazz)) {
                            result = false;
                            break;
                        }
                    }
                    if (result) {
                        const frame = node.querySelectorAll("IFRAME")[1];
                        frame.addEventListener("load", function (e) {
                            const info = windows.loki.getSiteInfo("tudou");
                            let fd = frame.contentDocument;
                            const email = fd.getElementById("loginname");
                            email.placeholder = "";
                            email.value = info.account; //db("video").find({site: "tudou"}).account//"jb"
                            const passwd = fd.querySelector("input#password1");
                            passwd.placeholder = "";
                            passwd.value = info.password; //db("video").find({site: "tudou"}).password//"penis"
                        });
                    }
                }
                if (node.nodeName == "SPAN" && node.attributes.getNamedItem("class")) {
                    console.log(node.attributes.getNamedItem("class"));
                }
            }
        }
    }
});
mutationObserver.observe(document, {
    "childList": true,
    "subtree": true
});
console.log("tudou-mod loaded");
//# sourceMappingURL=tudou-mod.js.map