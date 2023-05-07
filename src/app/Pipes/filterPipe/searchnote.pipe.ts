import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchnote'
})
export class SearchnotePipe implements PipeTransform {

  transform(value: any[], args: any) {
    if(!args){
      return value;
    }

    return value?.filter((item:any)=>{
      return item.title.includes(args)
    })
  }

}
