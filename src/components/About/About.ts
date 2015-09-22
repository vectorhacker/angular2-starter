import {Component, View, bootstrap, bind, NgIf} from 'angular2/angular2';
import {RouteParams} from 'angular2/router';

@Component({
	selector: 'about'
})
@View({
	templateUrl: './templates/About.html',
	directives: [NgIf]
})
export class About {
	page:string;
	constructor(params: RouteParams) {
		this.page = params.get('page');
	}
}