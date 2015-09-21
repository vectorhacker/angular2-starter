/* */ 
'use strict';
var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    return Reflect.decorate(decorators, target, key, desc);
  switch (arguments.length) {
    case 2:
      return decorators.reduceRight(function(o, d) {
        return (d && d(o)) || o;
      }, target);
    case 3:
      return decorators.reduceRight(function(o, d) {
        return (d && d(target, key)), void 0;
      }, void 0);
    case 4:
      return decorators.reduceRight(function(o, d) {
        return (d && d(target, key, o)) || o;
      }, desc);
  }
};
var __metadata = (this && this.__metadata) || function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(k, v);
};
var di_bindings_1 = require("./di_bindings");
var application_common_1 = require("../../core/application_common");
var di_1 = require("../../../di");
var browser_adapter_1 = require("../../core/dom/browser_adapter");
var wtf_init_1 = require("../../core/profile/wtf_init");
var setup_1 = require("./setup");
var render_compiler_1 = require("./render_compiler");
var renderer_1 = require("./renderer");
var xhr_impl_1 = require("./xhr_impl");
var client_message_broker_1 = require("../shared/client_message_broker");
var service_message_broker_1 = require("../shared/service_message_broker");
function bootstrapUICommon(bus) {
  browser_adapter_1.BrowserDomAdapter.makeCurrent();
  var zone = application_common_1.createNgZone();
  wtf_init_1.wtfInit();
  return zone.run(function() {
    var injector = di_bindings_1.createInjector(zone, bus);
    injector.get(render_compiler_1.MessageBasedRenderCompiler).start();
    injector.get(renderer_1.MessageBasedRenderer).start();
    injector.get(xhr_impl_1.MessageBasedXHRImpl).start();
    injector.get(setup_1.WebWorkerSetup).start();
    return injector.get(WebWorkerApplication);
  });
}
exports.bootstrapUICommon = bootstrapUICommon;
var WebWorkerApplication = (function() {
  function WebWorkerApplication(_clientMessageBrokerFactory, _serviceMessageBrokerFactory) {
    this._clientMessageBrokerFactory = _clientMessageBrokerFactory;
    this._serviceMessageBrokerFactory = _serviceMessageBrokerFactory;
  }
  WebWorkerApplication.prototype.createClientMessageBroker = function(channel) {
    return this._clientMessageBrokerFactory.createMessageBroker(channel);
  };
  WebWorkerApplication.prototype.createServiceMessageBroker = function(channel) {
    return this._serviceMessageBrokerFactory.createMessageBroker(channel);
  };
  WebWorkerApplication = __decorate([di_1.Injectable(), __metadata('design:paramtypes', [client_message_broker_1.ClientMessageBrokerFactory, service_message_broker_1.ServiceMessageBrokerFactory])], WebWorkerApplication);
  return WebWorkerApplication;
})();
exports.WebWorkerApplication = WebWorkerApplication;
