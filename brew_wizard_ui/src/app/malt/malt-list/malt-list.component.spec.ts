import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaltListComponent } from './malt-list.component';

describe('MaltListComponent', () => {
  let component: MaltListComponent;
  let fixture: ComponentFixture<MaltListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaltListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaltListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
