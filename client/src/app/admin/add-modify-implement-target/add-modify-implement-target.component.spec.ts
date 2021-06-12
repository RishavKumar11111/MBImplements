import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImplementTargetComponent } from './add-implement-target.component';

describe('AddImplementTargetComponent', () => {
  let component: AddImplementTargetComponent;
  let fixture: ComponentFixture<AddImplementTargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddImplementTargetComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddImplementTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});