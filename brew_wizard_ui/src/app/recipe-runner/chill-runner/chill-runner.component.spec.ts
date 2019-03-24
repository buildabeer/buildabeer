import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChillRunnerComponent } from './chill-runner.component';

describe('ChillRunnerComponent', () => {
  let component: ChillRunnerComponent;
  let fixture: ComponentFixture<ChillRunnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChillRunnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChillRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
