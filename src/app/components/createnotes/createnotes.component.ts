import { Component } from '@angular/core';

@Component({
  selector: 'app-createnotes',
  templateUrl: './createnotes.component.html',
  styleUrls: ['./createnotes.component.scss']
})
export class CreatenotesComponent {

  show:boolean=true;

  showing(){
    this.show=false
  }
  closenote(){
    this.show=true;
  }

}
