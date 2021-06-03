import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockInitialisationComponent } from './stock-initialisation.component';

describe('StockInitialisationComponent', () => {
  let component: StockInitialisationComponent;
  let fixture: ComponentFixture<StockInitialisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockInitialisationComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockInitialisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});