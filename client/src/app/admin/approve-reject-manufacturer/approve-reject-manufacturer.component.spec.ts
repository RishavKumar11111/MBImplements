import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveRejectManufacturerComponent } from './approve-reject-manufacturer.component';

describe('ApproveRejectManufacturerComponent', () => {
  let component: ApproveRejectManufacturerComponent;
  let fixture: ComponentFixture<ApproveRejectManufacturerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApproveRejectManufacturerComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveRejectManufacturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});