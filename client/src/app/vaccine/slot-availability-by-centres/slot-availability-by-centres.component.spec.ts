import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotAvailabilityByCentresComponent } from './slot-availability-by-centres.component';

describe('SlotAvailabilityByCentresComponent', () => {
  let component: SlotAvailabilityByCentresComponent;
  let fixture: ComponentFixture<SlotAvailabilityByCentresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SlotAvailabilityByCentresComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotAvailabilityByCentresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});