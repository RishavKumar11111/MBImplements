import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModifyImplementPriceComponent } from './add-modify-implement-price.component';

describe('AddModifyImplementPriceComponent', () => {
  let component: AddModifyImplementPriceComponent;
  let fixture: ComponentFixture<AddModifyImplementPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddModifyImplementPriceComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddModifyImplementPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});