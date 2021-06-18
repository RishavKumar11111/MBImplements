import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-farmer-booking',
  templateUrl: './farmer-booking.component.html',
  styleUrls: ['./farmer-booking.component.css']
})
export class FarmerBookingComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
}