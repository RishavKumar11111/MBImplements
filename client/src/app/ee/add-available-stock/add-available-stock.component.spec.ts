import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAvailableStockComponent } from './add-available-stock.component';

describe('AddAvailableStockComponent', () => {
  let component: AddAvailableStockComponent;
  let fixture: ComponentFixture<AddAvailableStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAvailableStockComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAvailableStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});