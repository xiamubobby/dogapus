"use strict";
/**
 * Created by natsuki on 16/5/23.
 */
(function (Signals) {
    Signals[Signals["LoginSuccess"] = 0] = "LoginSuccess";
    Signals[Signals["NavigateToSite"] = 1] = "NavigateToSite";
    Signals[Signals["SetControlBackground"] = 2] = "SetControlBackground";
    Signals[Signals["AlertOnRenderer"] = 3] = "AlertOnRenderer";
})(exports.Signals || (exports.Signals = {}));
var Signals = exports.Signals;
//# sourceMappingURL=ipc_signals.js.map