/* */ 
"format cjs";
import { isPresent } from 'angular2/src/core/facade/lang';
export class HtmlTextAst {
    constructor(value, sourceInfo) {
        this.value = value;
        this.sourceInfo = sourceInfo;
    }
    visit(visitor) { return visitor.visitText(this); }
}
export class HtmlAttrAst {
    constructor(name, value, sourceInfo) {
        this.name = name;
        this.value = value;
        this.sourceInfo = sourceInfo;
    }
    visit(visitor) { return visitor.visitAttr(this); }
}
export class HtmlElementAst {
    constructor(name, attrs, children, sourceInfo) {
        this.name = name;
        this.attrs = attrs;
        this.children = children;
        this.sourceInfo = sourceInfo;
    }
    visit(visitor) { return visitor.visitElement(this); }
}
export function htmlVisitAll(visitor, asts) {
    var result = [];
    asts.forEach(ast => {
        var astResult = ast.visit(visitor);
        if (isPresent(astResult)) {
            result.push(astResult);
        }
    });
    return result;
}
//# sourceMappingURL=html_ast.js.map