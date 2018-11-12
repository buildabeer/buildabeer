import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YeastListComponent } from './yeast-list.component';

describe('YeastListComponent', () => {
  let component: YeastListComponent;
  let fixture: ComponentFixture<YeastListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YeastListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YeastListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
