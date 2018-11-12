import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaltNewComponent } from './malt-new.component';

describe('MaltNewComponent', () => {
  let component: MaltNewComponent;
  let fixture: ComponentFixture<MaltNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaltNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaltNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
