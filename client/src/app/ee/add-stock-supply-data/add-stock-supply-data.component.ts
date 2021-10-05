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
  districtList: Array<{ DistrictCode: number, DistrictName: string, PDSDistrictName: string }>;
  implementList: Array<{ ImplementID: number, ImplementName: string }>;
  stockSupplyData: Array<any>;

  addStockSupplyDataForm: FormGroup;
  @ViewChild('addStockSupplyDataFormID') assdFormID: any;

  constructor(
    private eeService: EeService,
    private layoutService: LayoutService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.title = 'Add Stock\'s Supply Data';
    this.breadcrumbs = ['Add Stock\'s Supply Data', 'Approve the total no. of Stocks to be supplied by the Suppliers based on various requirements Implement-wise'];
    this.districtList = [];
    this.implementList = [];
    this.stockSupplyData = [];

    this.addStockSupplyDataForm = this.fb.group({
      selectedDistrict: ['', Validators.required],
      selectedImplement: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // this.layoutService.currentTitle.subscribe((t: string) => this.title = t);
    this.layoutService.setTitle(this.title);
    // this.layoutService.currentBreadcrumbs.subscribe((bc: Array<string>) => this.breadcrumbs = bc);
    this.layoutService.setBreadcrumbs(this.breadcrumbs);
    this.layoutService.setTitle(this.title);
    // this.layoutService.currentBreadcrumbs.subscribe((bc: Array<string>) => this.breadcrumbs = bc);
    this.layoutService.setBreadcrumbs(this.breadcrumbs);
    this.loadEEDistricts();
    this.loadAllImplements();
  }

  get f() { return this.addStockSupplyDataForm.controls; }
  get selectedDistrict() { return this.addStockSupplyDataForm.get('selectedDistrict'); }
  get selectedImplement() { return this.addStockSupplyDataForm.get('selectedImplement'); }

  loadEEDistricts() {
    this.eeService.getEEDistricts().subscribe((result: any) => {
      this.districtList = result;
      this.districtList.unshift({
        DistrictCode: 0, DistrictName: 'All', PDSDistrictName: 'All'
      });
    }, (error) => this.toastr.error(error.statusText, error.status));
  }

  loadAllImplements() {
    this.eeService.getAllImplements().subscribe((result: any) => {
      this.implementList = result;
      this.implementList.unshift({
        ImplementID: 0, ImplementName: 'All'
      });
    }, (error) => this.toastr.error(error.statusText, error.status));
  }

  loadStockSupplyData() {
    const dc = (this.selectedDistrict?.value === null || this.selectedDistrict?.value === undefined || this.selectedDistrict?.value === '') ? 0 : this.selectedDistrict?.value.DistrictCode;
    const iid = (this.selectedImplement?.value === null || this.selectedImplement?.value === undefined || this.selectedImplement?.value === '') ? 0 : this.selectedImplement?.value.ImplementID;
    this.eeService.getStockSupplyData(dc, iid).subscribe((result: any) => {
      this.stockSupplyData = result;
    }, (error) => this.toastr.error(error.statusText, error.status));
  }

  onSubmit() {

  }
}