System.register(['angular2/core', '../components/people.component', '../services/hate.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, people_component_1, hate_service_1;
    var HateRoute;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (people_component_1_1) {
                people_component_1 = people_component_1_1;
            },
            function (hate_service_1_1) {
                hate_service_1 = hate_service_1_1;
            }],
        execute: function() {
            HateRoute = (function () {
                function HateRoute(hate) {
                    this.hate = hate;
                    this.list = this.hate.list;
                }
                HateRoute = __decorate([
                    core_1.Component({
                        selector: 'hate',
                        template: "\n        <people \n            [list]=\"list\" \n            title=\"People I Hate\"></people>\n    ",
                        directives: [people_component_1.PeopleComponent],
                        providers: [hate_service_1.Hate]
                    }), 
                    __metadata('design:paramtypes', [hate_service_1.Hate])
                ], HateRoute);
                return HateRoute;
            })();
            exports_1("HateRoute", HateRoute);
        }
    }
});
//# sourceMappingURL=hate.route.js.map