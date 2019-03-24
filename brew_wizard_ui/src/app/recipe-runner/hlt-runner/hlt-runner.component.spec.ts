import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HltRunnerComponent } from './hlt-runner.component';

describe('HltRunnerComponent', () => {
  let component: HltRunnerComponent;
  let fixture: ComponentFixture<HltRunnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HltRunnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HltRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
