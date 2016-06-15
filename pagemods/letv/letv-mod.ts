/**
 * Created by natsuki on 16/4/28.
 */
console.log("letv-mod loading")
var mutationObserver = new MutationObserver(function (mutations) {
    for (const mutation of mutations) {
        if (mutation.type == "childList" && mutation.addedNodes && mutation.addedNodes.length != 0) {
            for (var i = 0; i < mutation.addedNodes.length; i++) {
                const node: HTMLElement = mutation.addedNodes[i];
                if (node.nodeName == "DIV") {
                    // if (node.id == ("j-load")) {
                    //     const frame = node.querySelector("iframe")
                    //     frame.addEventListener("load", function (e) {
                    //         const info = loki.getSiteInfo("letv");
                    //         console.log(info)
                    //         const fd = frame.contentDocument;
                    //         const email = fd.querySelector("#loginname")
                    //         email.placeholder = "";
                    //         email.value = info.account;//db("video").find({site: "letv"}).account//"jb"
                    //         const passwd = fd.querySelector("#password")
                    //         passwd.placeholder = "";
                    //         passwd.value = info.passowrd;//db("video").find({site: "letv"}).password//"penis"
                    //     })
                    // }
                    if (node.id == "LEPass_LOGIN_IFRAME") {
                        const usernameInput: HTMLInputElement = <HTMLInputElement> node.querySelector("input.loginname");
                        const passwordInput: HTMLInputElement = <HTMLInputElement> node.querySelector("input.password");
                        const info = loki.getSiteInfo("letv");
                        usernameInput.value = info.account;
                        passwordInput.value = info.password;
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