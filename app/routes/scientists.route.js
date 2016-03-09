System.register(['angular2/core', '../components/people.component', '../services/scientists.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, people_component_1, scientists_service_1;
    var ScientistsRoute;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (people_component_1_1) {
                people_component_1 = people_component_1_1;
            },
            function (scientists_service_1_1) {
                scientists_service_1 = scientists_service_1_1;
            }],
        execute: function() {
            ScientistsRoute = (function () {
                function ScientistsRoute(scientists) {
                    this.scientists = scientists;
                    this.list = this.scientists.scientists;
                }
                ScientistsRoute = __decorate([
                    core_1.Component({
                        selector: 'scientists',
                        template: "\n        <people \n            [list]=\"list\" \n            title=\"Scientists\"></people>\n    ",
                        directives: [people_component_1.PeopleComponent],
                        providers: [scientists_service_1.Scientists]
                    }), 
                    __metadata('design:paramtypes', [scientists_service_1.Scientists])
                ], ScientistsRoute);
                return ScientistsRoute;
            })();
            exports_1("ScientistsRoute", ScientistsRoute);
        }
    }
});
//# sourceMappingURL=scientists.route.js.map