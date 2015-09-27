/// <reference path="typings/tsd.d.ts" />
import 'zone.js';
import 'reflect-metadata';

import {Component, View, bootstrap, bind} from 'angular2/angular2';
import {RouteConfig, ROUTER_BINDINGS, LocationStrategy, HashLocationStrategy, RouterLink, Location, Router, RouterOutlet} from 'angular2/router';
import {HTTP_BINDINGS} from 'angular2/http';

import { About } from './components/About/About';
import { Home } from './components/Home/Home';

@Component({
	selector: 'starter'
})
@View({
	template: `
		<h1>Angular 2 Starter Kit</h1>
		<div>
			Something new
			<a [router-link]=['/home']>HOME</a>
			<a [router-link]="['/about', {page: 'Welcome'}]">ABOUT</a>
		</div>
		<router-outlet></router-outlet>
	`,
	directives: [RouterLink, RouterOutlet]
})
@RouteConfig([
	{ path: '/', component: Home, as: 'home' },
	{ path: '/about/:page', component: About, as: 'about' }
])
class Starter {

}

bootstrap(Starter, [HTTP_BINDINGS, ROUTER_BINDINGS, bind(LocationStrategy)
	.toClass(HashLocationStrategy)]);
