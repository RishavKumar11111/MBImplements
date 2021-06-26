import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { STEP_STATE } from '@angular/cdk/stepper';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('stepper') stepper: any;

  constructor(
    private homeService: HomeService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  // ngAfterViewInit() {
  //   this.stepper._getIndicatorType = () => STEP_STATE.NUMBER;
  // }
}