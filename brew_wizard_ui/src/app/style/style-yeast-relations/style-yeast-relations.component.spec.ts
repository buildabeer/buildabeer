import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleYeastRelationsComponent } from './style-yeast-relations.component';

describe('StyleYeastRelationsComponent', () => {
  let component: StyleYeastRelationsComponent;
  let fixture: ComponentFixture<StyleYeastRelationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StyleYeastRelationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleYeastRelationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
