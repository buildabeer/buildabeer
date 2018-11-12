import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleEditComponent } from './style-edit.component';

describe('StyleEditComponent', () => {
  let component: StyleEditComponent;
  let fixture: ComponentFixture<StyleEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StyleEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
