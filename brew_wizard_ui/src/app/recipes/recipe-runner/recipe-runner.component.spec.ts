import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeRunnerComponent } from './recipe-runner.component';

describe('RecipeRunnerComponent', () => {
  let component: RecipeRunnerComponent;
  let fixture: ComponentFixture<RecipeRunnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeRunnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
