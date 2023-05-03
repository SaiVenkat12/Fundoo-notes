import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent {
 @Input() displayallnotes:any
  show:boolean=true;

  showing(){
    this.show=false
  }
}
