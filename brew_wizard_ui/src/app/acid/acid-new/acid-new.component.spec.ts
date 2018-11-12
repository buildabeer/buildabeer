import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcidNewComponent } from './acid-new.component';

describe('AcidNewComponent', () => {
  let component: AcidNewComponent;
  let fixture: ComponentFixture<AcidNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcidNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcidNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
