import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { EeService } from '../../services/ee.service';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-add-stock-supply-data',
  templateUrl: './add-stock-supply-data.component.html',
  styleUrls: ['./add-stock-supply-data.component.css']
})
export class AddStockSupplyDataComponent implements OnInit {
  title: string;
  breadcrumbs: Array<string>;

  constructor(
    private eeService: EeService,
    private layoutService: LayoutService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.title = 'Add Stock\'s Supply Data';
    this.breadcrumbs = ['Add Stock\'s Supply Data', 'Approve the total no. of Stocks to be supplied by the Suppliers based on various requirements Implement-wise'];
  }

  ngOnInit(): void {
    // this.layoutService.currentTitle.subscribe((t: string) => this.title = t);
    this.layoutService.setTitle(this.title);
    // this.layoutService.currentBreadcrumbs.subscribe((bc: Array<string>) => this.breadcrumbs = bc);
    this.layoutService.setBreadcrumbs(this.breadcrumbs);
  }
}