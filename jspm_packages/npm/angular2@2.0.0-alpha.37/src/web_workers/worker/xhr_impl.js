/* */ 
'use strict';
var __extends = (this && this.__extends) || function(d, b) {
  for (var p in b)
    if (b.hasOwnProperty(p))
      d[p] = b[p];
  function __() {
    this.constructor = d;
  }
  __.prototype = b.prototype;
  d.prototype = new __();
};
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
var di_1 = require("../../../di");
var xhr_1 = require("../../core/render/xhr");
var client_message_broker_1 = require("../shared/client_message_broker");
var messaging_api_1 = require("../shared/messaging_api");
var WebWorkerXHRImpl = (function(_super) {
  __extends(WebWorkerXHRImpl, _super);
  function WebWorkerXHRImpl(messageBrokerFactory) {
    _super.call(this);
    this._messageBroker = messageBrokerFactory.createMessageBroker(messaging_api_1.XHR_CHANNEL);
  }
  WebWorkerXHRImpl.prototype.get = function(url) {
    var fnArgs = [new client_message_broker_1.FnArg(url, null)];
    var args = new client_message_broker_1.UiArguments("get", fnArgs);
    return this._messageBroker.runOnService(args, String);
  };
  WebWorkerXHRImpl = __decorate([di_1.Injectable(), __metadata('design:paramtypes', [client_message_broker_1.ClientMessageBrokerFactory])], WebWorkerXHRImpl);
  return WebWorkerXHRImpl;
})(xhr_1.XHR);
exports.WebWorkerXHRImpl = WebWorkerXHRImpl;
