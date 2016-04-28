/**
 * Created by natsuki on 16/4/28.
 */
console.log("letv-mod loading");
var mutationObserver = new MutationObserver(function (mutations) {
    for (const mutation of mutations) {
        if (mutation.type == "childList" && mutation.addedNodes && mutation.addedNodes.length != 0) {
            for (var i = 0; i < mutation.addedNodes.length; i++) {
                const node = mutation.addedNodes[i];
                if (node.nodeName == "DIV") {
                    if (node.id == ("j-load")) {
                        const frame = node.querySelector("iframe");
                        frame.addEventListener("load", function (e) {
                            const info = loki.getSiteInfo("letv");
                            const fd = frame.contentDocument;
                            const email = fd.querySelector("#loginname");
                            email.placeholder = "";
                            email.value = info.account; //db("video").find({site: "letv"}).account//"jb"
                            const passwd = fd.querySelector("#password");
                            passwd.placeholder = "";
                            passwd.value = info.passowrd; //db("video").find({site: "letv"}).password//"penis"
                        });
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
console.log("letv-mod loaded");
//# sourceMappingURL=letv-mod.js.map