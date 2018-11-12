import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscellaneousSelectComponent } from './miscellaneous-select.component';

describe('MiscellaneousSelectComponent', () => {
  let component: MiscellaneousSelectComponent;
  let fixture: ComponentFixture<MiscellaneousSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiscellaneousSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscellaneousSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
