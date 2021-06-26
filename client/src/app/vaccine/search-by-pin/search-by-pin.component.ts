import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VaccineService } from '../../services/vaccine.service';

@Component({
  selector: 'app-search-by-pin',
  templateUrl: './search-by-pin.component.html',
  styleUrls: ['./search-by-pin.component.css', '../search/search.component.css']
})
export class SearchByPinComponent implements OnInit {
  loading: boolean;
  array: Array<object>;

  @Input() searchPinForm: any;
  @Input() getDate: string;
  @Output() emittedEvent: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('searchPinFormID') searchPinFormID: any;

  constructor(
    private vaccineService: VaccineService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loading = false;
    this.getDate = '';
    this.array = [];
  }

  ngOnInit(): void {
    this.vaccineService.currentArray.subscribe((message: Array<object>) => { this.array = message; });
  }

  get spf() { return this.searchPinForm.controls; }

  keyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.getSlotAvailabilityByPinForWeek();
      return false;
    }
    return true;
  }

  addValidators(e: any) {
    if (e.target.nextSibling.innerText.includes('Pin')) {
      if (this.spf.enteredPin.errors === null) {
        this.spf.enteredPin.setValidators([Validators.required, Validators.minLength(6), Validators.maxLength(6)]);
        this.spf.enteredPin.updateValueAndValidity();
      }
    }
  }

  clearResetOnChange(e: any) {
    this.emittedEvent.emit(e);
  }

  getSlotAvailabilityByPinForWeek() {
    if (this.spf.enteredPin.value !== '' && this.spf.enteredPin.value.length === 6) {
      this.loading = true;
      this.spf.enteredPin.disable();
      this.vaccineService.getSlotAvailabilityByPinForWeek(parseInt(this.spf.enteredPin.value, 10), this.getDate).subscribe((result: any) => {
        const res = result.centers;
        if (res.length > 0) {
          // console.log(res);
          const sessions = res.map((i: any) => i.sessions.map((j: any) => ({
            date: j.date, availableSlots: j.available_capacity
          }))).flat();
          const dateAvailableSlots = sessions.reduce((acc: any, curr: any) => {
            const index = acc.findIndex((i: any) => i.date === curr.date);
            if (index === -1) {
              acc.push(curr);
            } else {
              acc[index] = {
                ...acc[index], availableSlots: (acc[index].availableSlots + curr.availableSlots)
              };
            }
            return acc;
          }, []);
          // console.log(dateAvailableSlots);
          this.vaccineService.changeMessage(dateAvailableSlots);
          this.router.navigate(['slotAvailability']);
        } else {
          this.toastr.warning(`No slots are available in this area.\n<a href="javascript:void(0);">Click here to get notified when a slot is available.</a>`);
        }
      }, (error) => this.toastr.error(error.statusText, error.status));
      this.spf.enteredPin.enable();
      this.loading = false;
    } else {
      this.toastr.warning(`Please enter a <b>Pin</b>.`);
    }
  }
}