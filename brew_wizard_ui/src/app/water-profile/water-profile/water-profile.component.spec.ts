import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterProfileComponent } from './water-profile.component';

describe('WaterProfileComponent', () => {
  let component: WaterProfileComponent;
  let fixture: ComponentFixture<WaterProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
