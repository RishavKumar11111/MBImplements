import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverStockComponent } from './deliver-stock.component';

describe('DeliverStockComponent', () => {
  let component: DeliverStockComponent;
  let fixture: ComponentFixture<DeliverStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeliverStockComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});