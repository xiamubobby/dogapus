/**
 * Created by natsuki on 16/4/26.
 */
import loki = require("lokijs")
import electron = require("electron");
import IpcMain = Electron.IpcMain;
import IpcRenderer = Electron.IpcRenderer;
import IpcMainEvent = Electron.IpcMainEvent;
let db = new loki();

const ipcMain:IpcMain = electron.ipcMain;
const ipcRenderer: IpcRenderer = electron.ipcRenderer;

enum Signals {
    GET_ACCESS_TOKEN, UPDATE_ACCESS_TOKEN, GET_SITE_INFO, UPDATE_SITE_INFO
}


const COLLECTION_USER = "user";
if (!db.getCollection(COLLECTION_USER)) {
    db.addCollection(COLLECTION_USER)
}
let user = db.getCollection(COLLECTION_USER);
const COLLECTION_SITES = "sites";
if (!db.getCollection(COLLECTION_SITES)) {
    db.addCollection(COLLECTION_SITES)
}
let sites = db.getCollection(COLLECTION_SITES);




export function getAccessToken(event?: IpcMainEvent){
    if (process.type == "browser") {
        let result = user.findOne().data()[0];
        const ret = (result && result.token) ? result.token : "NO_TOKEN";
        if (event) event.returnValue = ret;
        return ret;
    } else {
        return ipcRenderer.sendSync(Signals.GET_ACCESS_TOKEN)
    }
}

export function updateAccessToken(eventOrtoken, payloadToken) {
    if (ipcRenderer) {
        return ipcRenderer.sendSync(Signals.UPDATE_ACCESS_TOKEN, eventOrtoken);
    } else {
        user.chain().remove();
        user.insert({token: payloadToken});
        if (eventOrtoken) eventOrtoken.returnValue = null
    }
}

export function getSiteInfo(eventOrSiteName, payloadSiteName) {
    if (ipcRenderer) {
        return ipcRenderer.sendSync(Signals.GET_SITE_INFO, eventOrSiteName);
    } else {
        const result = sites.findOne({siteName: payloadSiteName});
        if (eventOrSiteName) eventOrSiteName.returnValue = result;
        return result
    }
}

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

export function updateSiteInfo(eventOrSiteName, payloadSiteNameOrAccount, payloadAccountOrPassword, payloadPassword) {
    if (ipcRenderer) {
        return ipcRenderer.sendSync(Signals.UPDATE_SITE_INFO, eventOrSiteName, payloadSiteNameOrAccount, payloadAccountOrPassword);
    } else {
        sites.removeWhere({siteName: payloadSiteNameOrAccount});
        sites.insert({
            siteName: payloadSiteNameOrAccount,
            account: payloadAccountOrPassword,
            password: payloadPassword
        });
        if (eventOrSiteName) eventOrSiteName.returnValue = null;
    }
}

export function clearSiteInfos() {
    sites.chain().remove()
}

for (const signal in Signals) {
    if (Signals.hasOwnProperty(signal)) {
        if (ipcMain) {
            ipcMain.on(Signals[signal],
                (event, ...arg) =>
                    this[signal.split("_")
                            .map((part, index)=>(index != 0) ? `${part[0].toUpperCase()}${part.slice(1).toLowerCase()}` : part.toLowerCase())
                        .join("")]
                    (event, ...arg)
                //enums are logged as int in node environment but as string in browser environment, which is strange.
            )
        }
    }

}