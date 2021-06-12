import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialiseStockComponent } from './initialise-stock.component';

describe('InitialiseStockComponent', () => {
  let component: InitialiseStockComponent;
  let fixture: ComponentFixture<InitialiseStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InitialiseStockComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialiseStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});