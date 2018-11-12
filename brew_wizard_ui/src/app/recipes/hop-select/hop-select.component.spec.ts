import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HopSelectComponent } from './hop-select.component';

describe('HopSelectComponent', () => {
  let component: HopSelectComponent;
  let fixture: ComponentFixture<HopSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HopSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HopSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
