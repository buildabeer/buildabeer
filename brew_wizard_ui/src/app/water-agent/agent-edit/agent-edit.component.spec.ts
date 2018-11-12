import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentEditComponent } from './agent-edit.component';

describe('AgentEditComponent', () => {
  let component: AgentEditComponent;
  let fixture: ComponentFixture<AgentEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
