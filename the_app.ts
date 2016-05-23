/**
 * Created by natsuki on 16/4/26.
 */
export enum RunTypeEnum {
    DEBUG, RELEASE
}
export const runType: RunTypeEnum = RunTypeEnum.DEBUG;
export const isDebug = function() { return runType == RunTypeEnum.DEBUG};

export enum StreamSiteEnum {
    YOUKU, IQIYI, SOHU, TENCENT, TUDOU, LETV
}

export const StreamSites = [StreamSiteEnum.YOUKU, StreamSiteEnum.IQIYI, StreamSiteEnum.SOHU, StreamSiteEnum.TENCENT, StreamSiteEnum.TUDOU, StreamSiteEnum.LETV]

let SiteDomains = {};
SiteDomains[StreamSiteEnum.YOUKU] = "youku";
SiteDomains[StreamSiteEnum.IQIYI] = "iqiyi";
SiteDomains[StreamSiteEnum.SOHU] = "sohu";
SiteDomains[StreamSiteEnum.TENCENT] = "qq";
SiteDomains[StreamSiteEnum.TUDOU] = "tudou";
SiteDomains[StreamSiteEnum.LETV] = "le";
export { SiteDomains }