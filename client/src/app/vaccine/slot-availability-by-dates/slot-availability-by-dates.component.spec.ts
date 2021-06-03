import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotAvailabilityByDatesComponent } from './slot-availability-by-dates.component';

describe('SlotAvailabilityByDatesComponent', () => {
  let component: SlotAvailabilityByDatesComponent;
  let fixture: ComponentFixture<SlotAvailabilityByDatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SlotAvailabilityByDatesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotAvailabilityByDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});