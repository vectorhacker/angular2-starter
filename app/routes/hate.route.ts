import { Component } from 'angular2/core'
import { PeopleComponent } from '../components/people.component'
import { Hate } from '../services/hate.service'

@Component({
    selector: 'hate',
    template: `
        <people 
            [list]="list" 
            title="People I Hate"></people>
    `,
    directives: [PeopleComponent],
    providers: [Hate]
})
export class HateRoute {
    list: string[]
    
    constructor(public hate: Hate) {
        this.list = this.hate.list
    }
}