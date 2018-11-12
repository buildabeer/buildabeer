import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterProfileNewComponent } from './water-profile-new.component';

describe('WaterProfileNewComponent', () => {
  let component: WaterProfileNewComponent;
  let fixture: ComponentFixture<WaterProfileNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterProfileNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterProfileNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
