import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiscellaneousNewComponent } from './miscellaneous-new.component';

describe('MiscellaneousNewComponent', () => {
  let component: MiscellaneousNewComponent;
  let fixture: ComponentFixture<MiscellaneousNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiscellaneousNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiscellaneousNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
