import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../services/admin.service';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title: string;
  breadcrumbs: Array<string>;

  constructor(
    private toastr: ToastrService,
    private adminService: AdminService,
    private layoutService: LayoutService
  ) {
    this.title = 'Dashboard';
    this.breadcrumbs = ['Dashboard', 'Dashboard'];
  }

  ngOnInit(): void {
    // this.layoutService.currentTitle.subscribe((t: string) => this.title = t);
    this.layoutService.setTitle(this.title);
    // this.layoutService.currentBreadcrumbs.subscribe((bc: Array<string>) => this.breadcrumbs = bc);
    this.layoutService.setBreadcrumbs(this.breadcrumbs);
  }
}