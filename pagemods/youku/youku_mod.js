/**
 * Created by natsuki on 16/4/27.
 */
var mutationObserver = new MutationObserver(function (mutations) {
    for (const mutation of mutations) {
        if (mutation.type == "childList" && mutation.addedNodes && mutation.addedNodes.length != 0) {
            for (var i = 0; i < mutation.addedNodes.length; i++) {
                const node = mutation.addedNodes[i];
                if (node.nodeName == "IFRAME") {
                    node.addEventListener("load", function (e) {
                        let passport = node.contentDocument.getElementById("passport");
                        passport.placeholder = "";
                        // passport.value = "a";
                        passport.value = loki.getSiteInfo("youku").account; //db("video").find({site: "youku"}).account//"jason82425@hotmail.com";
                        let password = node.contentDocument.getElementById("password");
                        password.addEventListener("change", function (e) {
                            console.log(e);
                        });
                        password.placeholder = "";
                        password.value = loki.getSiteInfo("youku").password; //db("video").find({site: "youku"}).password//"abcd123456";
                        // password.value = "b"
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
//# sourceMappingURL=youku_mod.js.map