/* */ 
"format cjs";
import { isPresent, StringWrapper } from 'angular2/src/core/facade/lang';
import { DOM } from 'angular2/src/core/dom/dom_adapter';
import { HtmlAttrAst, HtmlTextAst, HtmlElementAst } from './html_ast';
const NG_NON_BINDABLE = 'ng-non-bindable';
export class HtmlParser {
    parse(template, sourceInfo) {
        var root = DOM.createTemplate(template);
        return parseChildNodes(root, sourceInfo);
    }
}
function parseText(text, indexInParent, parentSourceInfo) {
    // TODO(tbosch): add source row/column source info from parse5 / package:html
    var value = DOM.getText(text);
    return new HtmlTextAst(value, `${parentSourceInfo} > #text(${value}):nth-child(${indexInParent})`);
}
function parseAttr(element, parentSourceInfo, attrName, attrValue) {
    // TODO(tbosch): add source row/column source info from parse5 / package:html
    return new HtmlAttrAst(attrName, attrValue, `${parentSourceInfo}[${attrName}=${attrValue}]`);
}
function parseElement(element, indexInParent, parentSourceInfo) {
    // normalize nodename always as lower case so that following build steps
    // can rely on this
    var nodeName = DOM.nodeName(element).toLowerCase();
    // TODO(tbosch): add source row/column source info from parse5 / package:html
    var sourceInfo = `${parentSourceInfo} > ${nodeName}:nth-child(${indexInParent})`;
    var attrs = parseAttrs(element, sourceInfo);
    var childNodes;
    if (ignoreChildren(attrs)) {
        childNodes = [];
    }
    else {
        childNodes = parseChildNodes(element, sourceInfo);
    }
    return new HtmlElementAst(nodeName, attrs, childNodes, sourceInfo);
}
function parseAttrs(element, elementSourceInfo) {
    // Note: sort the attributes early in the pipeline to get
    // consistent results throughout the pipeline, as attribute order is not defined
    // in DOM parsers!
    var attrMap = DOM.attributeMap(element);
    var attrList = [];
    attrMap.forEach((value, name) => attrList.push([name, value]));
    attrList.sort((entry1, entry2) => StringWrapper.compare(entry1[0], entry2[0]));
    return attrList.map(entry => parseAttr(element, elementSourceInfo, entry[0], entry[1]));
}
function parseChildNodes(element, parentSourceInfo) {
    var root = DOM.templateAwareRoot(element);
    var childNodes = DOM.childNodesAsList(root);
    var result = [];
    var index = 0;
    childNodes.forEach(childNode => {
        var childResult = null;
        if (DOM.isTextNode(childNode)) {
            var text = childNode;
            childResult = parseText(text, index, parentSourceInfo);
        }
        else if (DOM.isElementNode(childNode)) {
            var el = childNode;
            childResult = parseElement(el, index, parentSourceInfo);
        }
        if (isPresent(childResult)) {
            // Won't have a childResult for e.g. comment nodes
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
//# sourceMappingURL=html_parser.js.map