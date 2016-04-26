/**
 * Created by natsuki on 16/4/26.
 */
import loki = require("lokijs")
let db = new loki()

const COLLECTION_USER = "user"
if (!db.getCollection(COLLECTION_USER)) {
    db.addCollection(COLLECTION_USER)
}
let user = db.getCollection(COLLECTION_USER)
const COLLECTION_SITES = "sites"
if (!db.getCollection(COLLECTION_SITES)) {
    db.addCollection(COLLECTION_SITES)
}
let sites = db.getCollection(COLLECTION_SITES)

export function getAccessToken(){
    return user.findOne()
}

export function updateAccessToken(token: string) {
    user.chain().remove()
    user.insert({token: token})
}

export function getSiteInfo(siteName: string) {
    return sites.findOne({siteName: siteName}).data
}

export function updateSiteInfo(siteName: string, account: string, password: string) {
    sites.removeWhere({siteName: siteName})
    sites.add({
        siteName: siteName,
        account: account,
        password: password
    })
}

export function clearSiteInfos() {
    sites.chain().remove()
}