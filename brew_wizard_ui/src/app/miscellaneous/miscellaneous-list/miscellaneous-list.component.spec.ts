import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscellaneousListComponent } from './miscellaneous-list.component';

describe('MiscellaneousListComponent', () => {
  let component: MiscellaneousListComponent;
  let fixture: ComponentFixture<MiscellaneousListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiscellaneousListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscellaneousListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
