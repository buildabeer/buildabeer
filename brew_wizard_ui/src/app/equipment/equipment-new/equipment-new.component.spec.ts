import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentNewComponent } from './equipment-new.component';

describe('EquipmentNewComponent', () => {
  let component: EquipmentNewComponent;
  let fixture: ComponentFixture<EquipmentNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
