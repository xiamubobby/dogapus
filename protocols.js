"use strict";
/**
 * Created by natsuki on 16/4/26.
 */
const request = require("request");
const lokidb = require("./lokis/loki_manager");
const crypto = require("crypto");
const theApp = require("./the_app");
// const BASE_URL = "http://115.28.176.74:8080/ikan/";
exports.BASE_URL = "http://127.0.0.1:8080/";
exports.Methods = {
    GET: "GET",
    POST: "POST"
};
exports.VideoType = {
    YOUKU_TUDOU: 0,
    IQIYI: 1,
    QQ: 2,
    SOHU: 3,
    LETV: 4
};
function callback(cb, onfail) {
    function showError(text) {
        if (theApp.isDebug()) {
            console.log(text);
        }
        else {
            if (process.type == "renderer") {
                alert(text);
            }
        }
    }
    return function (err, response, body) {
        if (err) {
            showError(`net err: ${err}`);
            if (onfail)
                onfail();
            return;
        }
        if (response.statusCode >= 400) {
            showError(`网络错误: ${response.statusCode}`);
            if (onfail)
                onfail();
            return;
        }
        let bodyObject = JSON.parse(body);
        if (bodyObject.success != 1) {
            showError(`${bodyObject.message}`);
            if (onfail)
                onfail();
            return;
        }
        cb(err, response, bodyObject);
    };
}
exports.interfaces = {
    login: function (account, password, cb, onfail) {
        return request({
            method: "POST",
            uri: `${exports.BASE_URL}user/login`,
            form: {
                account: account,
                password: crypto.createHash("md5").update(password).digest("hex")
            },
            callback: callback(function (err, response, body) {
                if (cb)
                    cb(err, response, body);
            }, onfail)
        });
    },
    getVideoAccount: function (videoType, cb, onfail) {
        return request({
            method: "GET",
            uri: `${exports.BASE_URL}user/getIkanAccount`,
            headers: {
                'accessToken': lokidb.getAccessToken()
            },
            qs: {
                website: videoType
            },
            callback: callback(function (err, response, body) {
                if (cb)
                    cb(err, response, body);
            }, onfail)
        });
    },
    logout: function (cb, onfail) {
        return request({
            method: "POST",
            uri: `${exports.BASE_URL}user/logout`,
            headers: {
                'accessToken': lokidb.getAccessToken()
            },
            callback: callback(function (err, response, body) {
                if (cb)
                    cb(err, response, body);
            }, onfail)
        });
    },
    switchVip: function (cb, onfail) {
        return request({
            method: "POST",
            uri: `${exports.BASE_URL}user/switchVip`,
            headers: {
                'accessToken': lokidb.getAccessToken()
            },
            callback: callback(function (err, response, body) {
                if (cb)
                    cb(err, response, body);
            }, onfail)
        });
    }
};
// module.exports = {
//     BASE_URL: BASE_URL,
//     Methods: Methods,
//     VideoType: VEDIO_WEBSITE,
//     interfaces: interfaces
// }; 
//# sourceMappingURL=protocols.js.map