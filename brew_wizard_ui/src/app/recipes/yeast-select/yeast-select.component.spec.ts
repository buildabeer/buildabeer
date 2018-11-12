import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YeastSelectComponent } from './yeast-select.component';

describe('YeastSelectComponent', () => {
  let component: YeastSelectComponent;
  let fixture: ComponentFixture<YeastSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YeastSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YeastSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
