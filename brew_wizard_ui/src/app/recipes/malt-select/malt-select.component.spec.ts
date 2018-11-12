import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaltSelectComponent } from './malt-select.component';

describe('MaltSelectComponent', () => {
  let component: MaltSelectComponent;
  let fixture: ComponentFixture<MaltSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaltSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaltSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
