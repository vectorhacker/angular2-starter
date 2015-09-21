/* */ 
'use strict';
var lang_1 = require("../facade/lang");
function extractAnnotation(annotation) {
  if (lang_1.isFunction(annotation) && annotation.hasOwnProperty('annotation')) {
    annotation = annotation.annotation;
  }
  return annotation;
}
function applyParams(fnOrArray, key) {
  if (fnOrArray === Object || fnOrArray === String || fnOrArray === Function || fnOrArray === Number || fnOrArray === Array) {
    throw new Error("Can not use native " + lang_1.stringify(fnOrArray) + " as constructor");
  }
  if (lang_1.isFunction(fnOrArray)) {
    return fnOrArray;
  } else if (fnOrArray instanceof Array) {
    var annotations = fnOrArray;
    var fn = fnOrArray[fnOrArray.length - 1];
    if (!lang_1.isFunction(fn)) {
      throw new Error("Last position of Class method array must be Function in key " + key + " was '" + lang_1.stringify(fn) + "'");
    }
    var annoLength = annotations.length - 1;
    if (annoLength != fn.length) {
      throw new Error("Number of annotations (" + annoLength + ") does not match number of arguments (" + fn.length + ") in the function: " + lang_1.stringify(fn));
    }
    var paramsAnnotations = [];
    for (var i = 0,
        ii = annotations.length - 1; i < ii; i++) {
      var paramAnnotations = [];
      paramsAnnotations.push(paramAnnotations);
      var annotation = annotations[i];
      if (annotation instanceof Array) {
        for (var j = 0; j < annotation.length; j++) {
          paramAnnotations.push(extractAnnotation(annotation[j]));
        }
      } else if (lang_1.isFunction(annotation)) {
        paramAnnotations.push(extractAnnotation(annotation));
      } else {
        paramAnnotations.push(annotation);
      }
    }
    Reflect.defineMetadata('parameters', paramsAnnotations, fn);
    return fn;
  } else {
    throw new Error("Only Function or Array is supported in Class definition for key '" + key + "' is '" + lang_1.stringify(fnOrArray) + "'");
  }
}
function Class(clsDef) {
  var constructor = applyParams(clsDef.hasOwnProperty('constructor') ? clsDef.constructor : undefined, 'constructor');
  var proto = constructor.prototype;
  if (clsDef.hasOwnProperty('extends')) {
    if (lang_1.isFunction(clsDef.extends)) {
      constructor.prototype = proto = Object.create(clsDef.extends.prototype);
    } else {
      throw new Error("Class definition 'extends' property must be a constructor function was: " + lang_1.stringify(clsDef.extends));
    }
  }
  for (var key in clsDef) {
    if (key != 'extends' && key != 'prototype' && clsDef.hasOwnProperty(key)) {
      proto[key] = applyParams(clsDef[key], key);
    }
  }
  if (this && this.annotations instanceof Array) {
    Reflect.defineMetadata('annotations', this.annotations, constructor);
  }
  return constructor;
}
exports.Class = Class;
var Reflect = lang_1.global.Reflect;
if (!(Reflect && Reflect.getMetadata)) {
  throw 'reflect-metadata shim is required when using class decorators';
}
function makeDecorator(annotationCls, chainFn) {
  if (chainFn === void 0) {
    chainFn = null;
  }
  function DecoratorFactory(objOrType) {
    var annotationInstance = new annotationCls(objOrType);
    if (this instanceof annotationCls) {
      return annotationInstance;
    } else {
      var chainAnnotation = lang_1.isFunction(this) && this.annotations instanceof Array ? this.annotations : [];
      chainAnnotation.push(annotationInstance);
      var TypeDecorator = function TypeDecorator(cls) {
        var annotations = Reflect.getOwnMetadata('annotations', cls);
        annotations = annotations || [];
        annotations.push(annotationInstance);
        Reflect.defineMetadata('annotations', annotations, cls);
        return cls;
      };
      TypeDecorator.annotations = chainAnnotation;
      TypeDecorator.Class = Class;
      if (chainFn)
        chainFn(TypeDecorator);
      return TypeDecorator;
    }
  }
  DecoratorFactory.prototype = Object.create(annotationCls.prototype);
  return DecoratorFactory;
}
exports.makeDecorator = makeDecorator;
function makeParamDecorator(annotationCls) {
  function ParamDecoratorFactory() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i - 0] = arguments[_i];
    }
    var annotationInstance = Object.create(annotationCls.prototype);
    annotationCls.apply(annotationInstance, args);
    if (this instanceof annotationCls) {
      return annotationInstance;
    } else {
      ParamDecorator.annotation = annotationInstance;
      return ParamDecorator;
    }
    function ParamDecorator(cls, unusedKey, index) {
      var parameters = Reflect.getMetadata('parameters', cls);
      parameters = parameters || [];
      while (parameters.length <= index) {
        parameters.push(null);
      }
      parameters[index] = parameters[index] || [];
      var annotationsForParam = parameters[index];
      annotationsForParam.push(annotationInstance);
      Reflect.defineMetadata('parameters', parameters, cls);
      return cls;
    }
  }
  ParamDecoratorFactory.prototype = Object.create(annotationCls.prototype);
  return ParamDecoratorFactory;
}
exports.makeParamDecorator = makeParamDecorator;
