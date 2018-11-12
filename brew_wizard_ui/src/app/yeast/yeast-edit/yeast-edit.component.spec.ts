import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YeastEditComponent } from './yeast-edit.component';

describe('YeastEditComponent', () => {
  let component: YeastEditComponent;
  let fixture: ComponentFixture<YeastEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YeastEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YeastEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
