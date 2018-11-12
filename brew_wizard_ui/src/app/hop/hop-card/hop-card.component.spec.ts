import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HopCardComponent } from './hop-card.component';

describe('HopCardComponent', () => {
  let component: HopCardComponent;
  let fixture: ComponentFixture<HopCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HopCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HopCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
