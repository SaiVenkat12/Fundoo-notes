import { Component } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent {

  show:boolean=true;

  showing(){
    this.show=false
  }
}
