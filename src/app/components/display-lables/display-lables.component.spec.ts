import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayLablesComponent } from './display-lables.component';

describe('DisplayLablesComponent', () => {
  let component: DisplayLablesComponent;
  let fixture: ComponentFixture<DisplayLablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayLablesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayLablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
