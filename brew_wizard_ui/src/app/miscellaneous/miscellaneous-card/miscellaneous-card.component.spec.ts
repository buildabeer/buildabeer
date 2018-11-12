import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscellaneousCardComponent } from './miscellaneous-card.component';

describe('MiscellaneousCardComponent', () => {
  let component: MiscellaneousCardComponent;
  let fixture: ComponentFixture<MiscellaneousCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiscellaneousCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscellaneousCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
