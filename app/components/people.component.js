System.register(['angular2/core', 'angular2/common', '../pipes/drumpf.pipe', '../directives/highlight.directive'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, common_1, drumpf_pipe_1, highlight_directive_1;
    var PeopleComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (drumpf_pipe_1_1) {
                drumpf_pipe_1 = drumpf_pipe_1_1;
            },
            function (highlight_directive_1_1) {
                highlight_directive_1 = highlight_directive_1_1;
            }],
        execute: function() {
            /**
             * People
             */
            PeopleComponent = (function () {
                function PeopleComponent() {
                    this.color = 'lightblue';
                }
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], PeopleComponent.prototype, "list", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], PeopleComponent.prototype, "title", void 0);
                PeopleComponent = __decorate([
                    core_1.Component({
                        selector: 'people',
                        template: "\n        <h2>{{title}}</h2>\n        <ul>\n            <li *ngFor=\"#person of list\"  [highlight]=\"color\"> {{person | drumpf}} </li> \n        </ul>\n    ",
                        directives: [common_1.NgFor, highlight_directive_1.HighlightDirective],
                        pipes: [drumpf_pipe_1.DrumpfPipe]
                    }), 
                    __metadata('design:paramtypes', [])
                ], PeopleComponent);
                return PeopleComponent;
            })();
            exports_1("PeopleComponent", PeopleComponent);
        }
    }
});
//# sourceMappingURL=people.component.js.map