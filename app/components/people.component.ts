import { Component, Input } from 'angular2/core'
import { NgFor } from 'angular2/common'
import { DrumpfPipe } from '../pipes/drumpf.pipe'
import { HighlightDirective } from '../directives/highlight.directive'

/**
 * People
 */
@Component({
    selector: 'people',
    template: `
        <h2>{{title}}</h2>
        <ul>
            <li *ngFor="#person of list"  [highlight]="color"> {{person | drumpf}} </li> 
        </ul>
    `,
    directives: [NgFor, HighlightDirective],
    pipes: [DrumpfPipe]
})
export class PeopleComponent {
    
    color: string = 'lightblue'
    
    @Input() list: string[]
    @Input() title: string
    
    constructor() {
        
    }
}