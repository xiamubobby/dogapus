/**
 * Created by natsuki on 16/4/26.
 */
var loki = require("lokijs");
let db = new loki();
const COLLECTION_USER = "user";
if (!db.getCollection(COLLECTION_USER)) {
    db.addCollection(COLLECTION_USER);
}
let user = db.getCollection(COLLECTION_USER);
const COLLECTION_SITES = "sites";
if (!db.getCollection(COLLECTION_SITES)) {
    db.addCollection(COLLECTION_SITES);
}
let sites = db.getCollection(COLLECTION_SITES);
function getAccessToken() {
    let result = user.findOne().data()[0];
    if (result && result.token)
        return result.token;
}
exports.getAccessToken = getAccessToken;
function updateAccessToken(token) {
    user.chain().remove();
    user.insert({ token: token });
}
exports.updateAccessToken = updateAccessToken;
function getSiteInfo(siteName) {
    return sites.findOne({ siteName: siteName }).data()[0];
}
exports.getSiteInfo = getSiteInfo;
function updateSiteInfo(siteName, account, password) {
    sites.removeWhere({ siteName: siteName });
    sites.add({
        siteName: siteName,
        account: account,
        password: password
    });
}
exports.updateSiteInfo = updateSiteInfo;
function clearSiteInfos() {
    sites.chain().remove();
}
exports.clearSiteInfos = clearSiteInfos;
//# sourceMappingURL=loki_manager.js.map