import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-manufacturer-registration',
  templateUrl: './manufacturer-registration.component.html',
  styleUrls: ['./manufacturer-registration.component.css']
})
export class ManufacturerRegistrationComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
}