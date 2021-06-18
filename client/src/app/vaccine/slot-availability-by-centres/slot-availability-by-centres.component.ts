import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { VaccineService } from '../../services/vaccine.service';

@Component({
  selector: 'app-slot-availability-by-centres',
  templateUrl: './slot-availability-by-centres.component.html',
  styleUrls: ['./slot-availability-by-centres.component.css']
})
export class SlotAvailabilityByCentresComponent implements OnInit {
  constructor(
    private vaccineService: VaccineService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }
}