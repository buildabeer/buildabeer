import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcidEditComponent } from './acid-edit.component';

describe('AcidEditComponent', () => {
  let component: AcidEditComponent;
  let fixture: ComponentFixture<AcidEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcidEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcidEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
