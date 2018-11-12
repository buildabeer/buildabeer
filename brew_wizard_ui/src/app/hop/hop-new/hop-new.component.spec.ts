import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HopNewComponent } from './hop-new.component';

describe('HopNewComponent', () => {
  let component: HopNewComponent;
  let fixture: ComponentFixture<HopNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HopNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HopNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
