var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var router_1 = require('angular2/router');
var http_1 = require('angular2/http');
var Index = (function () {
    function Index() {
    }
    Index = __decorate([
        angular2_1.Component({
            selector: 'home'
        }),
        angular2_1.View({
            template: 'Home'
        }), 
        __metadata('design:paramtypes', [])
    ], Index);
    return Index;
})();
var About = (function () {
    function About() {
    }
    About = __decorate([
        angular2_1.Component({
            selector: 'about'
        }),
        angular2_1.View({
            template: 'About'
        }), 
        __metadata('design:paramtypes', [])
    ], About);
    return About;
})();
var Starter = (function () {
    function Starter() {
    }
    Starter = __decorate([
        angular2_1.Component({
            selector: 'starter'
        }),
        angular2_1.View({
            template: "\n\t\t<h1>Angular 2 Starter Kit</h1>\n\t\t<div>\n\t\t\t<a [router-link]=['/home']>HOME</a>\n\t\t\t<a [router-link]=['/about']>ABOUT</a>\n\t\t</div>\n\t\t<router-outlet></router-outlet>\n\t",
            directives: [router_1.RouterLink, router_1.RouterOutlet]
        }),
        router_1.RouteConfig([
            { path: '/', component: Index, as: 'home' },
            { path: '/about', component: About, as: 'about' }
        ]), 
        __metadata('design:paramtypes', [])
    ], Starter);
    return Starter;
})();
function main() {
    angular2_1.bootstrap(Starter, [http_1.HTTP_BINDINGS, router_1.ROUTER_BINDINGS, angular2_1.bind(router_1.LocationStrategy).toClass(router_1.HashLocationStrategy)]);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = main;
//# sourceMappingURL=app.js.map