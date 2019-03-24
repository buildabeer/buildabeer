import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderRunnerComponent } from './reminder-runner.component';

describe('ReminderRunnerComponent', () => {
  let component: ReminderRunnerComponent;
  let fixture: ComponentFixture<ReminderRunnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReminderRunnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
