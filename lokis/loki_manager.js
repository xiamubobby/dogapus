"use strict";
/**
 * Created by natsuki on 16/4/26.
 */
const loki = require("lokijs");
const electron = require("electron");
let db = new loki();
const ipcMain = electron.ipcMain;
const ipcRenderer = electron.ipcRenderer;
var Signals;
(function (Signals) {
    Signals[Signals["GET_ACCESS_TOKEN"] = 0] = "GET_ACCESS_TOKEN";
    Signals[Signals["UPDATE_ACCESS_TOKEN"] = 1] = "UPDATE_ACCESS_TOKEN";
    Signals[Signals["GET_SITE_INFO"] = 2] = "GET_SITE_INFO";
    Signals[Signals["UPDATE_SITE_INFO"] = 3] = "UPDATE_SITE_INFO";
})(Signals || (Signals = {}));
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
function getAccessToken(event, args) {
    if (event) {
        let result = user.findOne().data()[0];
        const ret = (result && result.token) ? result.token : "NO_TOKEN";
        event.returnValue = ret;
        return ret;
    }
    else {
        return ipcRenderer.sendSync(Signals.GET_ACCESS_TOKEN);
    }
}
exports.getAccessToken = getAccessToken;
function updateAccessToken(eventOrtoken, payloadToken) {
    if (ipcRenderer) {
        return ipcRenderer.sendSync(Signals.UPDATE_ACCESS_TOKEN, eventOrtoken);
    }
    else {
        user.chain().remove();
        user.insert({ token: payloadToken });
        eventOrtoken.returnValue = null;
    }
}
exports.updateAccessToken = updateAccessToken;
function getSiteInfo(eventOrSiteName, payloadSiteName) {
    if (ipcRenderer) {
        return ipcRenderer.sendSync(Signals.GET_SITE_INFO, eventOrSiteName);
    }
    else {
        const result = sites.findOne({ siteName: payloadSiteName });
        eventOrSiteName.returnValue = result;
        return result;
    }
}
exports.getSiteInfo = getSiteInfo;
// export function updateSiteInfo(siteName: string, account: string, password: string) {
//     return ipcRenderer.sendSync(Signals.UPDATE_SITE_INFO, siteName, account, password);
// }
//
// export function updateSiteInfo(event: IpcMainEvent, siteName: string, account: string, password: string) {
//     sites.removeWhere({siteName: siteName});
//     sites.insert({
//         siteName: siteName,
//         account: account,
//         password: password
//     });
//     event.returnValue = null;
// }
function updateSiteInfo(eventOrSiteName, payloadSiteNameOrAccount, payloadAccountOrPassword, payloadPassword) {
    if (ipcRenderer) {
        return ipcRenderer.sendSync(Signals.UPDATE_SITE_INFO, eventOrSiteName, payloadSiteNameOrAccount, payloadAccountOrPassword);
    }
    else {
        sites.removeWhere({ siteName: payloadSiteNameOrAccount });
        sites.insert({
            siteName: payloadSiteNameOrAccount,
            account: payloadAccountOrPassword,
            password: payloadPassword
        });
        eventOrSiteName.returnValue = null;
    }
}
exports.updateSiteInfo = updateSiteInfo;
function clearSiteInfos() {
    sites.chain().remove();
}
exports.clearSiteInfos = clearSiteInfos;
for (const signal in Signals) {
    if (Signals.hasOwnProperty(signal)) {
        if (ipcMain) {
            ipcMain.on(Signals[signal], (event, ...arg) => this[signal.split("_")
                .map((part, index) => (index != 0) ? `${part[0].toUpperCase()}${part.slice(1).toLowerCase()}` : part.toLowerCase())
                .join("")](event, ...arg));
        }
    }
}
//# sourceMappingURL=loki_manager.js.map