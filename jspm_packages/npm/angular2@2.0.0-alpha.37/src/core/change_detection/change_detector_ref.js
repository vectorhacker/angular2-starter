/* */ 
'use strict';
var constants_1 = require("./constants");
var ChangeDetectorRef = (function() {
  function ChangeDetectorRef(_cd) {
    this._cd = _cd;
  }
  ChangeDetectorRef.prototype.markForCheck = function() {
    this._cd.markPathToRootAsCheckOnce();
  };
  ChangeDetectorRef.prototype.detach = function() {
    this._cd.mode = constants_1.ChangeDetectionStrategy.Detached;
  };
  ChangeDetectorRef.prototype.reattach = function() {
    this._cd.mode = constants_1.ChangeDetectionStrategy.CheckAlways;
    this.markForCheck();
  };
  return ChangeDetectorRef;
})();
exports.ChangeDetectorRef = ChangeDetectorRef;
