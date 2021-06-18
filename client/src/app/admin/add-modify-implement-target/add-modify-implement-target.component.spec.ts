import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModifyImplementTargetComponent } from './add-modify-implement-target.component';

describe('AddModifyImplementTargetComponent', () => {
  let component: AddModifyImplementTargetComponent;
  let fixture: ComponentFixture<AddModifyImplementTargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddModifyImplementTargetComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddModifyImplementTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});