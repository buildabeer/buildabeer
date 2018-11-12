import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YeastNewComponent } from './yeast-new.component';

describe('YeastNewComponent', () => {
  let component: YeastNewComponent;
  let fixture: ComponentFixture<YeastNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YeastNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YeastNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
