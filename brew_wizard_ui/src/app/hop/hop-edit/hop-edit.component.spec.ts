import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HopEditComponent } from './hop-edit.component';

describe('HopEditComponent', () => {
  let component: HopEditComponent;
  let fixture: ComponentFixture<HopEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HopEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HopEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
