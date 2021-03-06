import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectionReasonDialogComponent } from './rejection-reason-dialog.component';

describe('RejectionReasonDialogComponent', () => {
  let component: RejectionReasonDialogComponent;
  let fixture: ComponentFixture<RejectionReasonDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RejectionReasonDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectionReasonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});