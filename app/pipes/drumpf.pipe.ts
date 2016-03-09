import {Pipe, PipeTransform} from 'angular2/core'

@Pipe({name: 'drumpf'})
export class DrumpfPipe implements PipeTransform {
  transform(value: string) : any {
    return value.replace('Trump', 'Drumpf')
  }
}