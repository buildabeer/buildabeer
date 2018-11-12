import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcidCardComponent } from './acid-card.component';

describe('AcidCardComponent', () => {
  let component: AcidCardComponent;
  let fixture: ComponentFixture<AcidCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcidCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcidCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
