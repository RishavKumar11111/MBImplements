import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { VaccineService } from '../../services/vaccine.service';

@Component({
  selector: 'app-slot-availability',
  templateUrl: './slot-availability.component.html',
  styleUrls: ['./slot-availability.component.css']
})
export class SlotAvailabilityComponent implements OnInit {
  tabIndex = 0;
  array: Array<object>;

  constructor(
    private vaccineService: VaccineService,
    private toastr: ToastrService
  ) {
    this.array = [];
  }

  ngOnInit(): void {
    this.vaccineService.currentArray.subscribe((message: Array<object>) => { this.array = message; });
    console.log(this.array);
  }
}