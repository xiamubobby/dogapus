/**
 *
 * Created by natsuki on 16/4/22.
 */
var mutationObserver = new MutationObserver(function (mutations) {
    for (const mutation of mutations) {
        if (mutation.type == "childList" && mutation.addedNodes && mutation.addedNodes.length != 0) {
            for (var i = 0; i < mutation.addedNodes.length; i++) {
                const node = mutation.addedNodes[i]
                if (node.nodeName == "DIV") {
                    if (node.classList.contains("globallogin")) {
                        console.log(node)
                        const email = node.querySelector("input[name='email']")
                        email.placeholder = ""
                        email.value = db("video").find({site: "sohu"}).account//"jb"
                        const passwd = node.querySelector("input[name='password']")
                        passwd.placeholder = ""
                        passwd.value = db("video").find({site: "sohu"}).password//"penis"
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