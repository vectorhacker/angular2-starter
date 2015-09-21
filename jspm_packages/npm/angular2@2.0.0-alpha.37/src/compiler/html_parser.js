/* */ 
'use strict';
var lang_1 = require("../core/facade/lang");
var dom_adapter_1 = require("../core/dom/dom_adapter");
var html_ast_1 = require("./html_ast");
var NG_NON_BINDABLE = 'ng-non-bindable';
var HtmlParser = (function() {
  function HtmlParser() {}
  HtmlParser.prototype.parse = function(template, sourceInfo) {
    var root = dom_adapter_1.DOM.createTemplate(template);
    return parseChildNodes(root, sourceInfo);
  };
  return HtmlParser;
})();
exports.HtmlParser = HtmlParser;
function parseText(text, indexInParent, parentSourceInfo) {
  var value = dom_adapter_1.DOM.getText(text);
  return new html_ast_1.HtmlTextAst(value, parentSourceInfo + " > #text(" + value + "):nth-child(" + indexInParent + ")");
}
function parseAttr(element, parentSourceInfo, attrName, attrValue) {
  return new html_ast_1.HtmlAttrAst(attrName, attrValue, parentSourceInfo + "[" + attrName + "=" + attrValue + "]");
}
function parseElement(element, indexInParent, parentSourceInfo) {
  var nodeName = dom_adapter_1.DOM.nodeName(element).toLowerCase();
  var sourceInfo = parentSourceInfo + " > " + nodeName + ":nth-child(" + indexInParent + ")";
  var attrs = parseAttrs(element, sourceInfo);
  var childNodes;
  if (ignoreChildren(attrs)) {
    childNodes = [];
  } else {
    childNodes = parseChildNodes(element, sourceInfo);
  }
  return new html_ast_1.HtmlElementAst(nodeName, attrs, childNodes, sourceInfo);
}
function parseAttrs(element, elementSourceInfo) {
  var attrMap = dom_adapter_1.DOM.attributeMap(element);
  var attrList = [];
  attrMap.forEach(function(value, name) {
    return attrList.push([name, value]);
  });
  attrList.sort(function(entry1, entry2) {
    return lang_1.StringWrapper.compare(entry1[0], entry2[0]);
  });
  return attrList.map(function(entry) {
    return parseAttr(element, elementSourceInfo, entry[0], entry[1]);
  });
}
function parseChildNodes(element, parentSourceInfo) {
  var root = dom_adapter_1.DOM.templateAwareRoot(element);
  var childNodes = dom_adapter_1.DOM.childNodesAsList(root);
  var result = [];
  var index = 0;
  childNodes.forEach(function(childNode) {
    var childResult = null;
    if (dom_adapter_1.DOM.isTextNode(childNode)) {
      var text = childNode;
      childResult = parseText(text, index, parentSourceInfo);
    } else if (dom_adapter_1.DOM.isElementNode(childNode)) {
      var el = childNode;
      childResult = parseElement(el, index, parentSourceInfo);
    }
    if (lang_1.isPresent(childResult)) {
      result.push(childResult);
    }
    index++;
  });
  return result;
}
function ignoreChildren(attrs) {
  for (var i = 0; i < attrs.length; i++) {
    var a = attrs[i];
    if (a.name == NG_NON_BINDABLE) {
      return true;
    }
  }
  return false;
}
