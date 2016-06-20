/**
 * Created by natsuki on 16/4/28.
 */
///<refrence path="../../indexinjections.ts />
console.log("tencent-mod loading");
var mutationObserver = new MutationObserver(function (mutations) {
    for (const mutation of mutations) {
        if (mutation.type == "childList" && mutation.addedNodes && mutation.addedNodes.length != 0) {
            for (var i = 0; i < mutation.addedNodes.length; i++) {
                const node = mutation.addedNodes[i];
                if (node.nodeName == "DIV") {
                    if (node.id == ("login_win")) {
                        const frame = document.getElementById("_login_frame_quick_");
                        frame.addEventListener("load", function (e) {
                            const info = windows.loki.getSiteInfo("tencent");
                            const fd = frame.contentDocument;
                            const email = fd.querySelector("#u");
                            email.placeholder = "";
                            email.value = info.account; //db("video").find({site: "tencent"}).account//"jb"
                            const passwd = fd.querySelector("#p");
                            passwd.placeholder = "";
                            passwd.value = info.password; //db("video").find({site: "tencent"}).password//"penis"
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
console.log("tencent-mod loaded");
//# sourceMappingURL=tencent-mod.js.map