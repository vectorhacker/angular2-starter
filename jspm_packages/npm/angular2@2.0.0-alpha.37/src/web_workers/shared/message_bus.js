/* */ 
'use strict';
var lang_1 = require("../../core/facade/lang");
var async_1 = require("../../core/facade/async");
exports.EventEmitter = async_1.EventEmitter;
exports.Observable = async_1.Observable;
function _abstract() {
  throw new lang_1.BaseException("This method is abstract");
}
var MessageBus = (function() {
  function MessageBus() {}
  MessageBus.prototype.from = function(channel) {
    throw _abstract();
  };
  MessageBus.prototype.to = function(channel) {
    throw _abstract();
  };
  return MessageBus;
})();
exports.MessageBus = MessageBus;
