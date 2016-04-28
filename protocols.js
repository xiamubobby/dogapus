"use strict";
/**
 * Created by natsuki on 16/4/26.
 */
const request = require("request");
const lokidb = require("./lokis/loki_manager");
const BASE_URL = "http://115.28.176.74:8080/ikan/";
const Methods = {
    GET: "GET",
    POST: "POST"
};
const VEDIO_WEBSITE = {
    YOUKU_TUDOU: 0,
    IQIYI: 1,
    QQ: 2,
    SOHU: 3,
    LETV: 4
};
function callback(cb) {
    return function (err, response, body) {
        if (err) {
            console.log(`net err: ${err}`);
            return;
        }
        if (response.statusCode >= 400) {
            console.log(`net err code: ${response.code}`);
            return;
        }
        let bodyObject = JSON.parse(body);
        if (bodyObject.success != 1) {
            console.log(`app err code: ${bodyObject.success}`);
            return;
        }
        cb(err, response, bodyObject);
    };
}
var interfaces = {
    login: function (account, password, cb) {
        return request({
            method: "POST",
            uri: `${BASE_URL}user/login`,
            form: {
                account: account,
                password: password
            },
            callback: callback(function (err, response, body) {
                cb(err, response, body);
            })
        });
    },
    getVideoAccount: function (videoType, cb) {
        return request({
            method: "GET",
            uri: `${BASE_URL}user/getIkanAccount`,
            headers: {
                'accessToken': lokidb.getAccessToken()
            },
            qs: {
                website: videoType
            },
            callback: callback(function (err, response, body) {
                cb(err, response, body);
            })
        });
    }
};
module.exports = {
    BASE_URL: BASE_URL,
    Methods: Methods,
    VideoType: VEDIO_WEBSITE,
    interfaces: interfaces
};
//# sourceMappingURL=protocols.js.map