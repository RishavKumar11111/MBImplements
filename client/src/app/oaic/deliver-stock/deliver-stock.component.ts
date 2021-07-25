import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { OaicService } from '../../services/oaic.service';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-deliver-stock',
  templateUrl: './deliver-stock.component.html',
  styleUrls: ['./deliver-stock.component.css']
})
export class DeliverStockComponent implements OnInit {
  title: string;
  breadcrumbs: Array<string>;

  constructor(
    private oaicService: OaicService,
    private layoutService: LayoutService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.title = 'Deliver Stocks';
    this.breadcrumbs = ['Deliver Stocks', 'Select the Stocks to be delivered to block in the required Vehicle No. Implement-wise'];
  }

  ngOnInit(): void {
    // this.layoutService.currentTitle.subscribe((t: string) => this.title = t);
    this.layoutService.setTitle(this.title);
    // this.layoutService.currentBreadcrumbs.subscribe((bc: Array<string>) => this.breadcrumbs = bc);
    this.layoutService.setBreadcrumbs(this.breadcrumbs);
  }
}