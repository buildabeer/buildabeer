import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HopComponent } from './hop.component';

describe('HopComponent', () => {
  let component: HopComponent;
  let fixture: ComponentFixture<HopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
