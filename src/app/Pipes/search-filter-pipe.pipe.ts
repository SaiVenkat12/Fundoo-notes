import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilterPipe'
})
export class SearchFilterPipePipe implements PipeTransform {

  transform (value: any[], args: any) {
    if(!args){
      return value;
    }
    return value?.filter((item:any)=>{
      return item.firstName.toLowerCase().includes(args) || item.lastName.toLowerCase().includes(args) ||item.email.toLowerCase().includes(args)
    })
  }

}
