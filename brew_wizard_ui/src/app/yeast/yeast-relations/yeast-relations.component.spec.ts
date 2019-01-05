import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YeastRelationsComponent } from './yeast-relations.component';

describe('YeastRelationsComponent', () => {
  let component: YeastRelationsComponent;
  let fixture: ComponentFixture<YeastRelationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YeastRelationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YeastRelationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
