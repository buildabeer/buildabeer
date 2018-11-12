import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HopListComponent } from './hop-list.component';

describe('HopListComponent', () => {
  let component: HopListComponent;
  let fixture: ComponentFixture<HopListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HopListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HopListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
