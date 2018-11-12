import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcidListComponent } from './acid-list.component';

describe('AcidListComponent', () => {
  let component: AcidListComponent;
  let fixture: ComponentFixture<AcidListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcidListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcidListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
