import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VaccineService } from '../../services/vaccine.service';

@Component({
  selector: 'app-search-by-district',
  templateUrl: './search-by-district.component.html',
  styleUrls: ['./search-by-district.component.css', '../search/search.component.css']
})
export class SearchByDistrictComponent implements OnInit {
  states: Array<{ state_id: number, state_name: string }>;
  districts: Array<{ district_id: number, district_name: string }>;
  loading: boolean;
  array: Array<object>;

  @Input() searchDistrictForm: any;
  @Input() getDate: string;
  @Output() emittedEvent: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild('searchDistrictFormID') searchDistrictFormID: any;

  constructor(
    private vaccineService: VaccineService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.states = [];
    this.districts = [];
    this.loading = false;
    this.getDate = '';
    this.array = [];
  }

  ngOnInit(): void {
    this.getStates();
    this.vaccineService.currentArray.subscribe((message: Array<object>) => { this.array = message; });
  }

  get sdf() { return this.searchDistrictForm.controls; }

  addValidators(e: any) {
    if (e.target.innerText.includes('State')) {
      if (this.sdf.selectedState.errors == null) {
        this.sdf.selectedState.setValidators([Validators.required]);
        this.sdf.selectedState.updateValueAndValidity();
      }
    } else if (e.target.innerText.includes('District')) {
      if (this.sdf.selectedDistrict.errors == null) {
        this.sdf.selectedDistrict.setValidators([Validators.required]);
        this.sdf.selectedDistrict.updateValueAndValidity();
      }
    }
  }

  clearResetOnChange(e: any) {
    this.emittedEvent.emit(e);
  }

  getStates() {
    this.vaccineService.getStates().subscribe((result: any) => {
      this.states = result.states;
    }, (error) => this.toastr.error(error.statusText, error.status));
  }

  getDistricts() {
    this.searchDistrictForm.patchValue({
      selectedDistrict: ''
    });
    this.vaccineService.getDistricts(this.sdf.selectedState.value.state_id).subscribe((result: any) => {
      this.districts = result.districts;
    }, (error) => this.toastr.error(error.statusText, error.status));
  }

  getSlotAvailabilityByDistrictForWeek() {
    if (this.sdf.selectedDistrict.value.district_id !== undefined) {
      this.loading = true;
      this.sdf.selectedState.disable();
      this.sdf.selectedDistrict.disable();
      this.vaccineService.getSlotAvailabilityByDistrictForWeek(this.sdf.selectedDistrict.value.district_id, this.getDate).subscribe((result: any) => {
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
          this.toastr.warning(`No slots are available in this area.\n<a href="">Click here to get notified when a slot is available.</a>`);
        }
      }, (error) => this.toastr.error(error.statusText, error.status));
      this.sdf.selectedState.enable();
      this.sdf.selectedDistrict.enable();
      this.loading = false;
    } else {
      this.toastr.warning(`Please select a <b>District</b>.`);
    }
  }
}