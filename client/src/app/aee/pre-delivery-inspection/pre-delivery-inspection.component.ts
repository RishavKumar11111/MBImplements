import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { AeeService } from '../../services/aee.service';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-pre-delivery-inspection',
  templateUrl: './pre-delivery-inspection.component.html',
  styleUrls: ['./pre-delivery-inspection.component.css']
})
export class PreDeliveryInspectionComponent implements OnInit {
  title: string;
  breadcrumbs: Array<string>;

  constructor(
    private aeeService: AeeService,
    private layoutService: LayoutService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.title = 'Pre-delivery Inspection';
    this.breadcrumbs = ['Pre-delivery Inspection', 'Approve / Reject the Stock Serial Nos. of Implements after Pre-delivery Inspection'];
  }

  ngOnInit(): void {
    // this.layoutService.currentTitle.subscribe((t: string) => this.title = t);
    this.layoutService.setTitle(this.title);
    // this.layoutService.currentBreadcrumbs.subscribe((bc: Array<string>) => this.breadcrumbs = bc);
    this.layoutService.setBreadcrumbs(this.breadcrumbs);
  }
}