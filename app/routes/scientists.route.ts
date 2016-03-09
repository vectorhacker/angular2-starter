import { Component } from 'angular2/core'
import { PeopleComponent } from '../components/people.component'
import { Scientists } from '../services/scientists.service'

@Component({
    selector: 'scientists',
    template: `
        <people 
            [list]="list" 
            title="Scientists"></people>
    `,
    directives: [PeopleComponent],
    providers: [Scientists]
})
export class ScientistsRoute {
    list: string[]
    
    constructor(public scientists: Scientists) {
        this.list = this.scientists.scientists
    }
}