import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoilRunnerComponent } from './boil-runner.component';

describe('BoilRunnerComponent', () => {
  let component: BoilRunnerComponent;
  let fixture: ComponentFixture<BoilRunnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoilRunnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoilRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
