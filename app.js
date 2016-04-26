/**
 * Created by natsuki on 16/4/26.
 */
"use strict";
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
//# sourceMappingURL=app.js.map