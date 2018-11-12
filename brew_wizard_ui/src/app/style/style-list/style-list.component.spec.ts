import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleListComponent } from './style-list.component';

describe('StyleListComponent', () => {
  let component: StyleListComponent;
  let fixture: ComponentFixture<StyleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StyleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
