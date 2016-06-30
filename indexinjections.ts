/**
 * Created by natsuki on 16/6/20.
 */
interface LokiManager {
    loki: {}
}
import r = require("./lokis/loki_manager");
window["loki"] = r;