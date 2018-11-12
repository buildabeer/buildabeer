import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YeastCardComponent } from './yeast-card.component';

describe('YeastCardComponent', () => {
  let component: YeastCardComponent;
  let fixture: ComponentFixture<YeastCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YeastCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YeastCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
