import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HopRelationsComponent } from './hop-relations.component';

describe('HopRelationsComponent', () => {
  let component: HopRelationsComponent;
  let fixture: ComponentFixture<HopRelationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HopRelationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HopRelationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
