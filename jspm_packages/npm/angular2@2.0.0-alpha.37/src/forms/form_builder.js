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
var di_1 = require("../../di");
var collection_1 = require("../core/facade/collection");
var lang_1 = require("../core/facade/lang");
var modelModule = require("./model");
var FormBuilder = (function() {
  function FormBuilder() {}
  FormBuilder.prototype.group = function(controlsConfig, extra) {
    if (extra === void 0) {
      extra = null;
    }
    var controls = this._reduceControls(controlsConfig);
    var optionals = lang_1.isPresent(extra) ? collection_1.StringMapWrapper.get(extra, "optionals") : null;
    var validator = lang_1.isPresent(extra) ? collection_1.StringMapWrapper.get(extra, "validator") : null;
    if (lang_1.isPresent(validator)) {
      return new modelModule.ControlGroup(controls, optionals, validator);
    } else {
      return new modelModule.ControlGroup(controls, optionals);
    }
  };
  FormBuilder.prototype.control = function(value, validator) {
    if (validator === void 0) {
      validator = null;
    }
    if (lang_1.isPresent(validator)) {
      return new modelModule.Control(value, validator);
    } else {
      return new modelModule.Control(value);
    }
  };
  FormBuilder.prototype.array = function(controlsConfig, validator) {
    var _this = this;
    if (validator === void 0) {
      validator = null;
    }
    var controls = collection_1.ListWrapper.map(controlsConfig, function(c) {
      return _this._createControl(c);
    });
    if (lang_1.isPresent(validator)) {
      return new modelModule.ControlArray(controls, validator);
    } else {
      return new modelModule.ControlArray(controls);
    }
  };
  FormBuilder.prototype._reduceControls = function(controlsConfig) {
    var _this = this;
    var controls = {};
    collection_1.StringMapWrapper.forEach(controlsConfig, function(controlConfig, controlName) {
      controls[controlName] = _this._createControl(controlConfig);
    });
    return controls;
  };
  FormBuilder.prototype._createControl = function(controlConfig) {
    if (controlConfig instanceof modelModule.Control || controlConfig instanceof modelModule.ControlGroup || controlConfig instanceof modelModule.ControlArray) {
      return controlConfig;
    } else if (lang_1.isArray(controlConfig)) {
      var value = controlConfig[0];
      var validator = controlConfig.length > 1 ? controlConfig[1] : null;
      return this.control(value, validator);
    } else {
      return this.control(controlConfig);
    }
  };
  FormBuilder = __decorate([di_1.Injectable(), __metadata('design:paramtypes', [])], FormBuilder);
  return FormBuilder;
})();
exports.FormBuilder = FormBuilder;
