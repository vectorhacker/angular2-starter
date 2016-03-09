import { Component } from 'angular2/core'
import {
    RouteConfig,
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS
} from 'angular2/router'

import { HTTP_PROVIDERS } from 'angular2/http'

import { ScientistsRoute } from '../routes/scientists.route'
import { HateRoute } from '../routes/hate.route'

@Component({
    selector: 'app',
    template: `
        <h1>Sample Angular 2 App</h1>
        <a [routerLink]="['Scientists']">Great Scientists</a>
        <a [routerLink]="['Hate']">People I Hate</a>
        <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
        HTTP_PROVIDERS
    ]
})
@RouteConfig([
    {
        path: '/scientists',
        name: 'Scientists',
        component: ScientistsRoute,
    },
    {
        path: '/hate',
        name: 'Hate',
        component: HateRoute
    }
])
export class AppComponent { }