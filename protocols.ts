/**
 * Created by natsuki on 16/4/26.
 */
import request = require("request");
import lokidb = require("./lokis/loki_manager");
import crypto = require("crypto");
import theApp = require("./the_app");
import electron = require("electron");
import {on} from "cluster";
import {on} from "cluster";
import {on} from "cluster";

// const BASE_URL = "http://115.28.176.74:8080/ikan/";
export const BASE_URL = "http://127.0.0.1:8080/";

export const Methods = {
    GET: "GET",
    POST: "POST"
};
export const VideoType = {
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
        } else {
            if (process.type == "renderer") {
                alert(text);
            }
        }
    }
    return function(err, response, body) {
        if (err) {
            showError(`net err: ${err}`);
            if (onfail) onfail();
            return;
        }
        if (response.statusCode >= 400) {
            showError(`网络错误: ${response.statusCode}`);
            if (onfail) onfail();
            return;
        }
        let bodyObject = JSON.parse(body)
        if (bodyObject.success != 1) {
            showError(`${bodyObject.message}`);
            if (onfail) onfail();
            return;
        }
        cb(err, response, bodyObject);
    }
}

export var interfaces = {
    login: function (account, password, cb, onfail?) {
        return request({
            method: "POST",
            uri: `${BASE_URL}user/login`,
            form: {
                account: account,
                password: crypto.createHash("md5").update(password).digest("hex")
            },
            callback: callback(function (err, response, body) {
                if (cb) cb(err, response, body)
            }, onfail)
        })
    },
    getVideoAccount: function (videoType, cb, onfail?) {
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
                if (cb) cb(err, response, body)
            }, onfail)
        })
    },
    logout: function (cb, onfail?) {
        return request({
            method: "POST",
            uri: `${BASE_URL}user/logout`,
            headers: {
                'accessToken': lokidb.getAccessToken()
            },
            callback: callback(function (err, response, body) {
                if (cb) cb(err, response, body)
            }, onfail)
        })
    },
    switchVip: function(cb?, onfail?) {
        return request({
            method: "POST",
            uri: `${BASE_URL}user/switchVip`,
            headers: {
                'accessToken': lokidb.getAccessToken()
            },
            callback: callback(function (err, response, body) {
                if (cb) cb(err, response, body)
            }, onfail)
        })
    }
};

// module.exports = {
//     BASE_URL: BASE_URL,
//     Methods: Methods,
//     VideoType: VEDIO_WEBSITE,
//     interfaces: interfaces
// };