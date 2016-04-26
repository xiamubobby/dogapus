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

export var StreamSites = [StreamSiteEnum.YOUKU, StreamSiteEnum.IQIYI, StreamSiteEnum.SOHU, StreamSiteEnum.TENCENT, StreamSiteEnum.TUDOU, StreamSiteEnum.LETV]
