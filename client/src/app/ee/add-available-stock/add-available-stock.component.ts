import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { EeService } from '../../services/ee.service';
import { LayoutService } from '../../services/layout.service';
import { StockInitialisation } from '../../models/ee/stock-initialisation.model';

@Component({
  selector: 'app-add-available-stock',
  templateUrl: './add-available-stock.component.html',
  styleUrls: ['./add-available-stock.component.css']
})
export class AddAvailableStockComponent implements OnInit {
  title: string;
  breadcrumbs: Array<string>;
  districtList: Array<{ DistrictCode: number, DistrictName: string, PDSDistrictName: string }>;
  implementStockList: Array<any>;
  selectedDistrict: any;
  totalAvailableSurplusStocks: any;
  foundNULL: boolean;

  @ViewChild('addAvailableStockForm') aasForm: any;

  constructor(
    private eeService: EeService,
    private layoutService: LayoutService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.title = 'Add Available Stocks';
    this.breadcrumbs = ['Add Available Stocks', 'Entry of the surplus stocks district-wise and implement-wise'];
    this.districtList = [];
    this.implementStockList = [];
    this.selectedDistrict = '';
    this.foundNULL = true;
  }

  ngOnInit(): void {
    // this.layoutService.currentTitle.subscribe((t: string) => this.title = t);
    this.layoutService.setTitle(this.title);
    // this.layoutService.currentBreadcrumbs.subscribe((bc: Array<string>) => this.breadcrumbs = bc);
    this.layoutService.setBreadcrumbs(this.breadcrumbs);
    this.loadEEDistricts();
  }

  loadEEDistricts() {
    this.eeService.getEEDistricts().subscribe((result: any) => {
      this.districtList = result;
    }, (error) => this.toastr.error(error.statusText, error.status));
  }

  loadImplementStockDetails() {
    this.eeService.getImplementStockDetails(this.selectedDistrict.DistrictCode).subscribe((result: any) => {
      this.implementStockList = result;
      this.calculateTotalAvailableSurplusStocks();
    }, (error) => this.toastr.error(error.statusText, error.status));
  }

  calculateTotalAvailableSurplusStocks() {
    this.totalAvailableSurplusStocks = 0;
    for (let i = 0; i < this.implementStockList.length; i++) {
      if (this.implementStockList[i].EnteredAvailableSurplusStocks !== undefined && this.implementStockList[i].EnteredAvailableSurplusStocks !== null && this.implementStockList[i].EnteredAvailableSurplusStocks !== '') {
        this.totalAvailableSurplusStocks += Number.isNaN(parseInt(this.implementStockList[i].EnteredAvailableSurplusStocks.toString().replace(/[^0-9]*/g, ''), 10)) ? 0 : parseInt(this.implementStockList[i].EnteredAvailableSurplusStocks.toString().replace(/[^0-9]*/g, ''), 10);
      }
    }
  }

  onSubmit() {
    if (this.selectedDistrict !== undefined && this.selectedDistrict !== null && this.selectedDistrict !== '') {
      const data = {
        district: {
          DistrictCode: this.selectedDistrict.DistrictCode, DistrictName: this.selectedDistrict.PDSDistrictName.substring(0, 3)
        },
        implementStockDetails: this.implementStockList.filter((x: any) => "EnteredAvailableSurplusStocks" in x && x.EnteredAvailableSurplusStocks !== null && x.EnteredAvailableSurplusStocks !== undefined && x.EnteredAvailableSurplusStocks !== '' && x.EnteredAvailableSurplusStocks !== '0' && Number.isNaN(parseInt(x.EnteredAvailableSurplusStocks.toString().replace(/[^0-9]*/g, ''), 10)) === false && x.Status === null).map((x: any) => ({
          ImplementID: x.ImplementID, EnteredAvailableSurplusStocks: Number.isNaN(parseInt(x.EnteredAvailableSurplusStocks.toString().replace(/[^0-9]*/g, ''), 10)) ? 0 : parseInt(x.EnteredAvailableSurplusStocks.toString().replace(/[^0-9]*/g, ''), 10)
        }))
      };
      if (this.totalAvailableSurplusStocks !== 0 && data.implementStockDetails.length !== 0) {
        this.eeService.submitStockAvailability(data).subscribe((result: any) => {
          const totalEASS = result.filter((x: any) => x.EnteredAvailableSurplusStocks !== null).reduce((acc: any, curr: any) => acc + parseInt(curr.EnteredAvailableSurplusStocks, 10), 0);
          if (this.totalAvailableSurplusStocks === totalEASS) {
            this.toastr.success(`The amount of available surplus stocks for the implements and district "<b>${this.selectedDistrict.DistrictName}</b>" are entered successfully.`);
            const sd = this.selectedDistrict;
            this.aasForm.reset();
            setTimeout(() => {
              this.selectedDistrict = sd;
              // this.selectedDistrict = { DistrictCode: result[0].DistrictCode, DistrictName: result[0].DistrictName };
              this.implementStockList = result;
              this.calculateTotalAvailableSurplusStocks();
              this.foundNULL = this.implementStockList.some((x: any) => x.Status === null);
            }, 1);
          } else {
            this.toastr.error(`An error occurred! Please try again.`);
          }
        }, (error) => this.toastr.error(error.statusText, error.status));
      } else {
        this.toastr.warning('Please enter atleast one available surplus stock for an implement.');
      }
    } else {
      this.toastr.warning('Please select the District.');
    }
  }
}