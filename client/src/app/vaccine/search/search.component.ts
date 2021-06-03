import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { STEP_STATE } from '@angular/cdk/stepper';
import { VaccineService } from '../../services/vaccine.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  isEditable: boolean;

  searchPinForm: FormGroup;
  searchDistrictForm: FormGroup;

  @ViewChild('stepper') stepper: any;

  constructor(
    private vaccineService: VaccineService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.isEditable = true;

    this.searchPinForm = this.fb.group({
      enteredPin: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });

    this.searchDistrictForm = this.fb.group({
      selectedState: ['', Validators.required],
      selectedDistrict: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.stepper._getIndicatorType = () => STEP_STATE.NUMBER;
  }

  get sdf() { return this.searchDistrictForm.controls; }
  get spf() { return this.searchPinForm.controls; }

  receivedEvent(e: any) {
    this.clearResetOnChange(e);
  }

  clearResetOnChange(e: any) {
    const elem = (e.target === undefined) ? false : e.target.parentElement.parentElement.parentElement.parentElement.parentElement.innerText.includes('District');
    if (e.selectedIndex === 0 || elem) {
      if (this.sdf.selectedState.value !== '' && this.sdf.selectedDistrict.value !== '') {
        this.resetPatchDistrictForm();
      }
      this.clearStateDistrict();
      this.resetPatchPinForm();
    } else {
      if (this.spf.enteredPin.value !== '') {
        this.resetPatchPinForm();
      }
      this.clearPin();
      this.resetPatchDistrictForm();
    }
  }

  clearResetOnClick(e: any) {
    if (e.target.innerText === 'Search by District') {
      if (this.sdf.selectedState.value === '' && this.sdf.selectedDistrict.value === '') {
        this.clearStateDistrict();
      }
    } else if (e.target.innerText === 'Search by Pin') {
      if (this.spf.enteredPin.value === '') {
        this.clearPin();
      }
    }
  }

  getDate() {
    const today = new Date();
    today.setSeconds(19800);
    const date = today.toJSON().slice(0, 10);
    const formattedDate = `${date.slice(8, 10)}/${date.slice(5, 7)}/${date.slice(0, 4)}`;
    return formattedDate;
  }

  clearStateDistrict() {
    this.sdf.selectedState.clearValidators();
    this.sdf.selectedState.updateValueAndValidity();
    this.sdf.selectedDistrict.clearValidators();
    this.sdf.selectedDistrict.updateValueAndValidity();
  }

  resetPatchDistrictForm() {
    this.searchDistrictForm.reset();
    setTimeout(() => {
      this.searchDistrictForm.patchValue({
        selectedState: '',
        selectedDistrict: ''
      });
    }, 1);
  }

  clearPin() {
    this.spf.enteredPin.clearValidators();
    this.spf.enteredPin.updateValueAndValidity();
  }

  resetPatchPinForm() {
    this.searchPinForm.reset();
    setTimeout(() => {
      this.searchPinForm.patchValue({
        enteredPin: ''
      });
    }, 1);
  }
}