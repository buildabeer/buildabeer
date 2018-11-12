import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscellaneousEditComponent } from './miscellaneous-edit.component';

describe('MiscellaneousEditComponent', () => {
  let component: MiscellaneousEditComponent;
  let fixture: ComponentFixture<MiscellaneousEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiscellaneousEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscellaneousEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
