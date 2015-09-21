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
var lang_1 = require("../facade/lang");
var ExpressionChangedAfterItHasBeenCheckedException = (function(_super) {
  __extends(ExpressionChangedAfterItHasBeenCheckedException, _super);
  function ExpressionChangedAfterItHasBeenCheckedException(exp, oldValue, currValue, context) {
    _super.call(this, ("Expression '" + exp + "' has changed after it was checked. ") + ("Previous value: '" + oldValue + "'. Current value: '" + currValue + "'"));
  }
  return ExpressionChangedAfterItHasBeenCheckedException;
})(lang_1.BaseException);
exports.ExpressionChangedAfterItHasBeenCheckedException = ExpressionChangedAfterItHasBeenCheckedException;
var ChangeDetectionError = (function(_super) {
  __extends(ChangeDetectionError, _super);
  function ChangeDetectionError(exp, originalException, originalStack, context) {
    _super.call(this, originalException + " in [" + exp + "]", originalException, originalStack, context);
    this.location = exp;
  }
  return ChangeDetectionError;
})(lang_1.BaseException);
exports.ChangeDetectionError = ChangeDetectionError;
var DehydratedException = (function(_super) {
  __extends(DehydratedException, _super);
  function DehydratedException() {
    _super.call(this, 'Attempt to detect changes on a dehydrated detector.');
  }
  return DehydratedException;
})(lang_1.BaseException);
exports.DehydratedException = DehydratedException;
