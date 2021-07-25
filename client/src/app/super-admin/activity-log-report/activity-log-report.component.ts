import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { SuperAdminService } from '../../services/super-admin.service';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-activity-log-report',
  templateUrl: './activity-log-report.component.html',
  styleUrls: ['./activity-log-report.component.css']
})
export class ActivityLogReportComponent implements OnInit {
  title: string;
  breadcrumbs: Array<string>;

  constructor(
    private superAdminService: SuperAdminService,
    private layoutService: LayoutService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.title = 'Activity Log Report';
    this.breadcrumbs = ['Activity Log Report', 'Activity Log Report'];
  }

  ngOnInit(): void {
    // this.layoutService.currentTitle.subscribe((t: string) => this.title = t);
    this.layoutService.setTitle(this.title);
    // this.layoutService.currentBreadcrumbs.subscribe((bc: Array<string>) => this.breadcrumbs = bc);
    this.layoutService.setBreadcrumbs(this.breadcrumbs);
  }
}