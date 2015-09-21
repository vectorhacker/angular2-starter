/* */ 
(function(process) {
  'use strict';
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  var post_message_bus_1 = require("../shared/post_message_bus");
  var impl_1 = require("./impl");
  var impl_2 = require("./impl");
  exports.WebWorkerApplication = impl_2.WebWorkerApplication;
  __export(require("../shared/message_bus"));
  function bootstrap(uri) {
    var instance = spawnWebWorker(uri);
    instance.app = impl_1.bootstrapUICommon(instance.bus);
    return instance;
  }
  exports.bootstrap = bootstrap;
  function spawnWebWorker(uri) {
    var webWorker = new Worker(uri);
    var sink = new post_message_bus_1.PostMessageBusSink(webWorker);
    var source = new post_message_bus_1.PostMessageBusSource(webWorker);
    var bus = new post_message_bus_1.PostMessageBus(sink, source);
    return new WebWorkerInstance(null, webWorker, bus);
  }
  exports.spawnWebWorker = spawnWebWorker;
  var WebWorkerInstance = (function() {
    function WebWorkerInstance(app, worker, bus) {
      this.app = app;
      this.worker = worker;
      this.bus = bus;
    }
    return WebWorkerInstance;
  })();
  exports.WebWorkerInstance = WebWorkerInstance;
})(require("process"));
