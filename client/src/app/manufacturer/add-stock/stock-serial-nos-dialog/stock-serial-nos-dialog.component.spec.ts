import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockSerialNosDialogComponent } from './stock-serial-nos-dialog.component';

describe('StockSerialNosDialogComponent', () => {
  let component: StockSerialNosDialogComponent;
  let fixture: ComponentFixture<StockSerialNosDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockSerialNosDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockSerialNosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});