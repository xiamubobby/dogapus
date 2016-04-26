/**
 *
 * Created by xiamubobby on 4/22/16.
 */
var mutationObserver = new MutationObserver(function (mutations) {
    for (const mutation of mutations) {
        if (mutation.type == "childList" && mutation.addedNodes && mutation.addedNodes.length != 0) {
            for (var i = 0; i < mutation.addedNodes.length; i++) {
                const node = mutation.addedNodes[i]
                if (node.nodeName == "DIV") {
                    if (node.id == "qipaLoginIfr") {
                        const email = node.querySelector("input[data-loginbox-elem='emailInput']")
                        email.placeholder = ""
                        email.value = db("video").find({site: "iqiyi"}).account//"jb"
                        const passwd = node.querySelector("input[data-loginbox-elem='passwdInput'")
                        passwd.placeholder = ""
                        passwd.value = db("video").find({site: "iqiyi"}).password//"penis"
                    }
                }
            }
        }
    }
});
mutationObserver.observe(document, {
    "childList": true,
    "subtree": true
})
