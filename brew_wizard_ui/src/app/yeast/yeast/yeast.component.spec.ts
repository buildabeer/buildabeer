import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YeastComponent } from './yeast.component';

describe('YeastComponent', () => {
  let component: YeastComponent;
  let fixture: ComponentFixture<YeastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YeastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YeastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
