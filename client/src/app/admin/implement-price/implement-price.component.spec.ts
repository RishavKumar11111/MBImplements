import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImplementPriceComponent } from './implement-price.component';

describe('ImplementPriceComponent', () => {
  let component: ImplementPriceComponent;
  let fixture: ComponentFixture<ImplementPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImplementPriceComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImplementPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});