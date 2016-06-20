/**
 * Created by natsuki on 16/4/28.
 */
///<refrence path="../../indexinjections.ts />
console.log("sohu-mod loading");
var mutationObserver = new MutationObserver(function (mutations) {
    for (const mutation of mutations) {
        if (mutation.type == "childList" && mutation.addedNodes && mutation.addedNodes.length != 0) {
            for (var i = 0; i < mutation.addedNodes.length; i++) {
                const node = mutation.addedNodes[i]
                if (node.nodeName == "DIV") {
                    if (node.classList.contains("globallogin")) {
                        const info = window.loki.getSiteInfo("sohu");
                        const email = node.querySelector("input[name='email']");
                        email.placeholder = "";
                        email.value = info.account;//db("video").find({site: "sohu"}).account//"jb"
                        const passwd = node.querySelector("input[name='password']");
                        passwd.placeholder = "";
                        passwd.value = info.password;//db("video").find({site: "sohu"}).password//"penis"
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
console.log("sohu-mod loaded");