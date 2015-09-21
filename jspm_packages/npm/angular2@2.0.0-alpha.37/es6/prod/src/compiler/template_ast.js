/* */ 
"format cjs";
import { isPresent } from 'angular2/src/core/facade/lang';
export class TextAst {
    constructor(value, sourceInfo) {
        this.value = value;
        this.sourceInfo = sourceInfo;
    }
    visit(visitor) { return visitor.visitText(this); }
}
export class BoundTextAst {
    constructor(value, sourceInfo) {
        this.value = value;
        this.sourceInfo = sourceInfo;
    }
    visit(visitor) { return visitor.visitBoundText(this); }
}
export class AttrAst {
    constructor(name, value, sourceInfo) {
        this.name = name;
        this.value = value;
        this.sourceInfo = sourceInfo;
    }
    visit(visitor) { return visitor.visitAttr(this); }
}
export class BoundElementPropertyAst {
    constructor(name, type, value, unit, sourceInfo) {
        this.name = name;
        this.type = type;
        this.value = value;
        this.unit = unit;
        this.sourceInfo = sourceInfo;
    }
    visit(visitor) { return visitor.visitElementProperty(this); }
}
export class BoundEventAst {
    constructor(name, target, handler, sourceInfo) {
        this.name = name;
        this.target = target;
        this.handler = handler;
        this.sourceInfo = sourceInfo;
    }
    visit(visitor) { return visitor.visitEvent(this); }
}
export class VariableAst {
    constructor(name, value, sourceInfo) {
        this.name = name;
        this.value = value;
        this.sourceInfo = sourceInfo;
    }
    visit(visitor) { return visitor.visitVariable(this); }
}
export class ElementAst {
    constructor(attrs, properties, events, vars, directives, children, sourceInfo) {
        this.attrs = attrs;
        this.properties = properties;
        this.events = events;
        this.vars = vars;
        this.directives = directives;
        this.children = children;
        this.sourceInfo = sourceInfo;
    }
    visit(visitor) { return visitor.visitElement(this); }
}
export class EmbeddedTemplateAst {
    constructor(attrs, vars, directives, children, sourceInfo) {
        this.attrs = attrs;
        this.vars = vars;
        this.directives = directives;
        this.children = children;
        this.sourceInfo = sourceInfo;
    }
    visit(visitor) { return visitor.visitEmbeddedTemplate(this); }
}
export class BoundDirectivePropertyAst {
    constructor(directiveName, templateName, value, sourceInfo) {
        this.directiveName = directiveName;
        this.templateName = templateName;
        this.value = value;
        this.sourceInfo = sourceInfo;
    }
    visit(visitor) { return visitor.visitDirectiveProperty(this); }
}
export class DirectiveAst {
    constructor(directive, properties, hostProperties, hostEvents, sourceInfo) {
        this.directive = directive;
        this.properties = properties;
        this.hostProperties = hostProperties;
        this.hostEvents = hostEvents;
        this.sourceInfo = sourceInfo;
    }
    visit(visitor) { return visitor.visitDirective(this); }
}
export class NgContentAst {
    constructor(select, sourceInfo) {
        this.select = select;
        this.sourceInfo = sourceInfo;
    }
    visit(visitor) { return visitor.visitNgContent(this); }
}
export var PropertyBindingType;
(function (PropertyBindingType) {
    PropertyBindingType[PropertyBindingType["Property"] = 0] = "Property";
    PropertyBindingType[PropertyBindingType["Attribute"] = 1] = "Attribute";
    PropertyBindingType[PropertyBindingType["Class"] = 2] = "Class";
    PropertyBindingType[PropertyBindingType["Style"] = 3] = "Style";
})(PropertyBindingType || (PropertyBindingType = {}));
export function templateVisitAll(visitor, asts) {
    var result = [];
    asts.forEach(ast => {
        var astResult = ast.visit(visitor);
        if (isPresent(astResult)) {
            result.push(astResult);
        }
    });
    return result;
}
//# sourceMappingURL=template_ast.js.map