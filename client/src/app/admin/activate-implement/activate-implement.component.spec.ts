import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateImplementComponent } from './activate-implement.component';

describe('ActivateImplementComponent', () => {
  let component: ActivateImplementComponent;
  let fixture: ComponentFixture<ActivateImplementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivateImplementComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateImplementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});