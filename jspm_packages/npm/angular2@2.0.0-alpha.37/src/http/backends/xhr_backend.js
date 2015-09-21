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
var enums_1 = require("../enums");
var static_response_1 = require("../static_response");
var base_response_options_1 = require("../base_response_options");
var di_1 = require("../../../di");
var browser_xhr_1 = require("./browser_xhr");
var async_1 = require("../../core/facade/async");
var lang_1 = require("../../core/facade/lang");
var XHRConnection = (function() {
  function XHRConnection(req, browserXHR, baseResponseOptions) {
    var _this = this;
    this.request = req;
    this.response = new async_1.EventEmitter();
    this._xhr = browserXHR.build();
    this._xhr.open(enums_1.RequestMethods[req.method].toUpperCase(), req.url);
    this._xhr.addEventListener('load', function(_) {
      var response = lang_1.isPresent(_this._xhr.response) ? _this._xhr.response : _this._xhr.responseText;
      var status = _this._xhr.status === 1223 ? 204 : _this._xhr.status;
      if (status === 0) {
        status = response ? 200 : 0;
      }
      var responseOptions = new base_response_options_1.ResponseOptions({
        body: response,
        status: status
      });
      if (lang_1.isPresent(baseResponseOptions)) {
        responseOptions = baseResponseOptions.merge(responseOptions);
      }
      async_1.ObservableWrapper.callNext(_this.response, new static_response_1.Response(responseOptions));
      async_1.ObservableWrapper.callReturn(_this.response);
    });
    this._xhr.addEventListener('error', function(err) {
      var responseOptions = new base_response_options_1.ResponseOptions({
        body: err,
        type: enums_1.ResponseTypes.Error
      });
      if (lang_1.isPresent(baseResponseOptions)) {
        responseOptions = baseResponseOptions.merge(responseOptions);
      }
      async_1.ObservableWrapper.callThrow(_this.response, new static_response_1.Response(responseOptions));
    });
    if (lang_1.isPresent(req.headers)) {
      req.headers.forEach(function(value, name) {
        _this._xhr.setRequestHeader(name, value);
      });
    }
    this._xhr.send(this.request.text());
  }
  XHRConnection.prototype.dispose = function() {
    this._xhr.abort();
  };
  return XHRConnection;
})();
exports.XHRConnection = XHRConnection;
var XHRBackend = (function() {
  function XHRBackend(_browserXHR, _baseResponseOptions) {
    this._browserXHR = _browserXHR;
    this._baseResponseOptions = _baseResponseOptions;
  }
  XHRBackend.prototype.createConnection = function(request) {
    return new XHRConnection(request, this._browserXHR, this._baseResponseOptions);
  };
  XHRBackend = __decorate([di_1.Injectable(), __metadata('design:paramtypes', [browser_xhr_1.BrowserXhr, base_response_options_1.ResponseOptions])], XHRBackend);
  return XHRBackend;
})();
exports.XHRBackend = XHRBackend;
