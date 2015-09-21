/* */ 
'use strict';
var utils = require("../utils");
function apply() {
  if (global.EventTarget) {
    utils.patchEventTargetMethods(global.EventTarget.prototype);
  } else {
    var apis = ['ApplicationCache', 'EventSource', 'FileReader', 'InputMethodContext', 'MediaController', 'MessagePort', 'Node', 'Performance', 'SVGElementInstance', 'SharedWorker', 'TextTrack', 'TextTrackCue', 'TextTrackList', 'WebKitNamedFlow', 'Window', 'Worker', 'WorkerGlobalScope', 'XMLHttpRequest', 'XMLHttpRequestEventTarget', 'XMLHttpRequestUpload'];
    apis.forEach(function(thing) {
      var obj = global[thing] && global[thing].prototype;
      if (obj && obj.addEventListener) {
        utils.patchEventTargetMethods(obj);
      }
    });
  }
}
module.exports = {apply: apply};
