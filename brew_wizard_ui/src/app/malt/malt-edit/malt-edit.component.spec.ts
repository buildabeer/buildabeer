import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaltEditComponent } from './malt-edit.component';

describe('MaltEditComponent', () => {
  let component: MaltEditComponent;
  let fixture: ComponentFixture<MaltEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaltEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaltEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
