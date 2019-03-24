import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MashRunnerComponent } from './mash-runner.component';

describe('MashRunnerComponent', () => {
  let component: MashRunnerComponent;
  let fixture: ComponentFixture<MashRunnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MashRunnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MashRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
