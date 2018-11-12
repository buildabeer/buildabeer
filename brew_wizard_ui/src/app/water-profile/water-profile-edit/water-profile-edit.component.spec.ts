import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterProfileEditComponent } from './water-profile-update.component';

describe('WaterProfileEditComponent', () => {
  let component: WaterProfileEditComponent;
  let fixture: ComponentFixture<WaterProfileEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterProfileEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
