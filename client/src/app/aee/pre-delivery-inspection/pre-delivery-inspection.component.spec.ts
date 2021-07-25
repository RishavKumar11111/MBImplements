import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreDeliveryInspectionComponent } from './pre-delivery-inspection.component';

describe('PreDeliveryInspectionComponent', () => {
  let component: PreDeliveryInspectionComponent;
  let fixture: ComponentFixture<PreDeliveryInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreDeliveryInspectionComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreDeliveryInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});