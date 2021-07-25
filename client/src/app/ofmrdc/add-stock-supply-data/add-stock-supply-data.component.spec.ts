import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStockSupplyDataComponent } from './add-stock-supply-data.component';

describe('AddStockSupplyDataComponent', () => {
  let component: AddStockSupplyDataComponent;
  let fixture: ComponentFixture<AddStockSupplyDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddStockSupplyDataComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStockSupplyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});