import { MediaMatcher } from '@angular/cdk/layout';
import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/Services/DataServices/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {
  
  mobileQuery: MediaQueryList;
  isSelected =false;
  show: boolean = true;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private dataService: DataService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  searchbg(){
    this.isSelected=true; 
  }

  showside(e: any) {
    //this.show = e.target.Changed;
    this.show = !this.show;
  }

  searchNote(event: any) {
    console.log(event.target.value);
    this.dataService.changeMessage(event.target.value);

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
