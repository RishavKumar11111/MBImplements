import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { OfmrdcService } from '../../services/ofmrdc.service';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  title: string;
  breadcrumbs: Array<string>;

  constructor(
    private ofmrdcService: OfmrdcService,
    private layoutService: LayoutService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.title = 'Change Password';
    this.breadcrumbs = ['Change Password', 'Change Password'];
  }

  ngOnInit(): void {
    // this.layoutService.currentTitle.subscribe((t: string) => this.title = t);
    this.layoutService.setTitle(this.title);
    // this.layoutService.currentBreadcrumbs.subscribe((bc: Array<string>) => this.breadcrumbs = bc);
    this.layoutService.setBreadcrumbs(this.breadcrumbs);
  }
}