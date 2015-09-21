/* */ 
"format cjs";
import { normalizeBool } from 'angular2/src/core/facade/lang';
export class TypeMetadata {
    constructor({ type, typeName, typeUrl } = {}) {
        this.type = type;
        this.typeName = typeName;
        this.typeUrl = typeUrl;
    }
}
export class ChangeDetectionMetadata {
    constructor({ changeDetection, properties, events, hostListeners, hostProperties }) {
        this.changeDetection = changeDetection;
        this.properties = properties;
        this.events = events;
        this.hostListeners = hostListeners;
        this.hostProperties = hostProperties;
    }
}
export class TemplateMetadata {
    constructor({ encapsulation, nodes, styles, styleAbsUrls, ngContentSelectors }) {
        this.encapsulation = encapsulation;
        this.nodes = nodes;
        this.styles = styles;
        this.styleAbsUrls = styleAbsUrls;
        this.ngContentSelectors = ngContentSelectors;
    }
}
/**
 * How the template and styles of a view should be encapsulated.
 */
export var ViewEncapsulation;
(function (ViewEncapsulation) {
    /**
     * Emulate scoping of styles by preprocessing the style rules
     * and adding additional attributes to elements. This is the default.
     */
    ViewEncapsulation[ViewEncapsulation["Emulated"] = 0] = "Emulated";
    /**
     * Uses the native mechanism of the renderer. For the DOM this means creating a ShadowRoot.
     */
    ViewEncapsulation[ViewEncapsulation["Native"] = 1] = "Native";
    /**
     * Don't scope the template nor the styles.
     */
    ViewEncapsulation[ViewEncapsulation["None"] = 2] = "None";
})(ViewEncapsulation || (ViewEncapsulation = {}));
export class DirectiveMetadata {
    constructor({ type, isComponent, selector, hostAttributes, changeDetection, template } = {}) {
        this.type = type;
        this.isComponent = normalizeBool(isComponent);
        this.selector = selector;
        this.hostAttributes = hostAttributes;
        this.changeDetection = changeDetection;
        this.template = template;
    }
}
//# sourceMappingURL=api.js.map