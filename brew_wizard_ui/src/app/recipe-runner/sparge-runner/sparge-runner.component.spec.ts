import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpargeRunnerComponent } from './sparge-runner.component';

describe('SpargeRunnerComponent', () => {
  let component: SpargeRunnerComponent;
  let fixture: ComponentFixture<SpargeRunnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpargeRunnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpargeRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
