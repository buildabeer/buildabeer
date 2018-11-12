import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleNewComponent } from './style-new.component';

describe('StyleNewComponent', () => {
  let component: StyleNewComponent;
  let fixture: ComponentFixture<StyleNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StyleNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
