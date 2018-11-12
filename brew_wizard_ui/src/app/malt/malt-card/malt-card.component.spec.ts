import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaltCardComponent } from './malt-card.component';

describe('MaltCardComponent', () => {
  let component: MaltCardComponent;
  let fixture: ComponentFixture<MaltCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaltCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaltCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
