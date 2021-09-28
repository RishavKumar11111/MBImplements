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
  selectedDistrict: any;
  implementStockList: Array<any>;
  totalAvailableSurplusStocks: any;
  foundNULL: boolean;
  @ViewChild('addAvailableStockForm') aasForm: any;
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
    this.selectedDistrict = '';
    this.implementStockList = [];
    this.selectedDistrict = '';
    this.foundNULL = true;
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
  loadEEDistricts() {
    this.eeService.getEEDistricts().subscribe((result: any) => {
      this.districtList = result;
    }, (error) => this.toastr.error(error.statusText, error.status));
  }
  loadAllImplements() {
    this.eeService.getAllImplements().subscribe((result: any) => {
      this.implementList = result;
    }, (error) => this.toastr.error(error.statusText, error.status));
  }
 
  populateStockSupplyData() {
    // this.eeService.getStockSupplyData(this.selectedDistrict.DistrictCode).subscribe((result: any) => {
    //   if (result.length > 0) {
    //     this.implementStockSerialNoList = result.reduce((acc: any, curr: any) => {
    //       const found = acc.find((x: any) => x.ImplementID === curr.ImplementID && x.ImplementName === curr.ImplementName);
    //       const stocksSerialNos = {
    //         ImplementID: curr.ImplementID, StockSerialNo: curr.StockSerialNo
    //       };
    //       if (!found) {
    //         acc.push({
    //           ImplementID: curr.ImplementID, ImplementName: curr.ImplementName, StocksSerialNos: [stocksSerialNos]
    //         });
    //       } else {
    //         found.StocksSerialNos.push(stocksSerialNos);
    //       }
    //       return acc;
    //     }, []);
    //   } else {
    //     this.toastr.info(`Either the Stocks have not been made available to districts or have already been initialised.`);
    //   }
    // }, (error) => this.toastr.error(error.statusText, error.status));
  }

  onSubmit() {
   
  }
}