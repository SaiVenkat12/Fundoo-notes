import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollabratorComponent } from './collabrator.component';

describe('CollabratorComponent', () => {
  let component: CollabratorComponent;
  let fixture: ComponentFixture<CollabratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollabratorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CollabratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
