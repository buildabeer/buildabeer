import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaltComponent } from './malt.component';

describe('MaltComponent', () => {
  let component: MaltComponent;
  let fixture: ComponentFixture<MaltComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaltComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
