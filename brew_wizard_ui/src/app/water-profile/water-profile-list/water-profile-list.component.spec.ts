import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterProfileListComponent } from './water-profile-list.component';

describe('WaterProfileListComponent', () => {
  let component: WaterProfileListComponent;
  let fixture: ComponentFixture<WaterProfileListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterProfileListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterProfileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
