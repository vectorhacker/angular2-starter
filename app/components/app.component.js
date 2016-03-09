System.register(['angular2/core', 'angular2/router', 'angular2/http', '../routes/scientists.route', '../routes/hate.route'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, http_1, scientists_route_1, hate_route_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (scientists_route_1_1) {
                scientists_route_1 = scientists_route_1_1;
            },
            function (hate_route_1_1) {
                hate_route_1 = hate_route_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'app',
                        template: "\n        <h1>Sample Angular 2 App</h1>\n        <a [routerLink]=\"['Scientists']\">Great Scientists</a>\n        <a [routerLink]=\"['Hate']\">People I Hate</a>\n        <router-outlet></router-outlet>\n    ",
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [
                            router_1.ROUTER_PROVIDERS,
                            http_1.HTTP_PROVIDERS
                        ]
                    }),
                    router_1.RouteConfig([
                        {
                            path: '/scientists',
                            name: 'Scientists',
                            component: scientists_route_1.ScientistsRoute,
                        },
                        {
                            path: '/hate',
                            name: 'Hate',
                            component: hate_route_1.HateRoute
                        }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map