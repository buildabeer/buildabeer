import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentNewComponent } from './agent-new.component';

describe('AgentNewComponent', () => {
  let component: AgentNewComponent;
  let fixture: ComponentFixture<AgentNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
