import {Component, View, bootstrap, bind} from 'angular2/angular2';
import {RouteConfig, ROUTER_BINDINGS, LocationStrategy, HashLocationStrategy, RouterLink, Location, Router, RouterOutlet} from 'angular2/router';
import {HTTP_BINDINGS} from 'angular2/http';


@Component({
	selector: 'home'
})
@View({
	template: 'Home'
})
class Index {
	constructor() {
		
	}
}

@Component({
	selector: 'about'
})
@View({
	template: 'About'
})
class About {
	constructor() {
		
	}
}

@Component({
	selector: 'starter'
})
@View({
	template: `
		<h1>Angular 2 Starter Kit</h1>
		<div>
			<a [router-link]=['/home']>HOME</a>
			<a [router-link]=['/about']>ABOUT</a>
		</div>
		<router-outlet></router-outlet>
	`,
	directives: [RouterLink, RouterOutlet]
})
@RouteConfig([
	{path: '/', component: Index, as: 'home'},
	{path: '/about', component: About, as: 'about'}
])
class Starter {
	
}

export default function main() {
	bootstrap(Starter, [HTTP_BINDINGS, ROUTER_BINDINGS, bind(LocationStrategy).toClass(HashLocationStrategy)]);
}