/**
 * Created by natsuki on 16/4/26.
 */
(function (RunTypeEnum) {
    RunTypeEnum[RunTypeEnum["DEBUG"] = 0] = "DEBUG";
    RunTypeEnum[RunTypeEnum["RELEASE"] = 1] = "RELEASE";
})(exports.RunTypeEnum || (exports.RunTypeEnum = {}));
var RunTypeEnum = exports.RunTypeEnum;
exports.runType = RunTypeEnum.DEBUG;
exports.isDebug = function () { return exports.runType == RunTypeEnum.DEBUG; };
(function (StreamSiteEnum) {
    StreamSiteEnum[StreamSiteEnum["YOUKU"] = 0] = "YOUKU";
    StreamSiteEnum[StreamSiteEnum["IQIYI"] = 1] = "IQIYI";
    StreamSiteEnum[StreamSiteEnum["SOHU"] = 2] = "SOHU";
    StreamSiteEnum[StreamSiteEnum["TENCENT"] = 3] = "TENCENT";
    StreamSiteEnum[StreamSiteEnum["TUDOU"] = 4] = "TUDOU";
    StreamSiteEnum[StreamSiteEnum["LETV"] = 5] = "LETV";
})(exports.StreamSiteEnum || (exports.StreamSiteEnum = {}));
var StreamSiteEnum = exports.StreamSiteEnum;
exports.StreamSites = [StreamSiteEnum.YOUKU, StreamSiteEnum.IQIYI, StreamSiteEnum.SOHU, StreamSiteEnum.TENCENT, StreamSiteEnum.TUDOU, StreamSiteEnum.LETV];
let SiteDomains = {};
exports.SiteDomains = SiteDomains;
SiteDomains[StreamSiteEnum.YOUKU] = "youku";
SiteDomains[StreamSiteEnum.IQIYI] = "iqiyi";
SiteDomains[StreamSiteEnum.SOHU] = "sohu";
SiteDomains[StreamSiteEnum.TENCENT] = "qq";
SiteDomains[StreamSiteEnum.TUDOU] = "tudou";
SiteDomains[StreamSiteEnum.LETV] = "le";
//# sourceMappingURL=the_app.js.map