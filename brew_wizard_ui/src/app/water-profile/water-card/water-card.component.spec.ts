import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterCardComponent } from './water-card.component';

describe('WaterCardComponent', () => {
  let component: WaterCardComponent;
  let fixture: ComponentFixture<WaterCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
