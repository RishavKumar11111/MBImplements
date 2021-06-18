import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerBookingComponent } from './farmer-booking.component';

describe('FarmerBookingComponent', () => {
  let component: FarmerBookingComponent;
  let fixture: ComponentFixture<FarmerBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FarmerBookingComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});