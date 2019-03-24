import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FermentationRunnerComponent } from './fermentation-runner.component';

describe('FermentationRunnerComponent', () => {
  let component: FermentationRunnerComponent;
  let fixture: ComponentFixture<FermentationRunnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FermentationRunnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FermentationRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
