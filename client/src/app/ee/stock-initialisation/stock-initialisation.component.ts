import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { EeService } from '../../services/ee.service';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-stock-initialisation',
  templateUrl: './stock-initialisation.component.html',
  styleUrls: ['./stock-initialisation.component.css']
})
export class StockInitialisationComponent implements OnInit {
  title: string;
  breadcrumbs: Array<string>;
  districtList: Array<{ DistrictCode: number, DistrictName: string }>;
  selectedDistrict: any;
  blockList: Array<{ BlockCode: number, BlockName: string }>;
  selectedBlock: any;
  implementStockSerialNoList: any;
  masterSelected: boolean;
  checkedList: any;
  submitted: boolean;

  constructor(
    private toastr: ToastrService,
    private eeService: EeService,
    private layoutService: LayoutService
  ) {
    this.title = 'Stock Initialisation';
    this.breadcrumbs = ['Stock Initialisation', 'Initialisation of the surplus stocks district-wise and block-wise'];
    this.districtList = [];
    this.blockList = [];
    this.selectedDistrict = '';
    this.selectedBlock = '';
    this.implementStockSerialNoList = [];
    this.masterSelected = false;
    this.submitted = false;
  }

  @ViewChild('stockInitialisationForm') siForm: any;

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

  populateBlocks() {
    this.eeService.getBlocks(this.selectedDistrict.DistrictCode).subscribe((result: any) => {
      this.blockList = result;
    }, (error) => this.toastr.error(error.statusText, error.status));
  }

  populateImplementsStockSerialNos() {
    this.eeService.getImplementsStockSerialNos(this.selectedDistrict.DistrictCode).subscribe((result: any) => {
      if (result.length > 0) {
        this.implementStockSerialNoList = result.reduce((acc: any, curr: any) => {
          const found = acc.find((x: any) => x.ImplementID === curr.ImplementID && x.ImplementName === curr.ImplementName);
          const stocksSerialNos = {
            ImplementID: curr.ImplementID, StockSerialNo: curr.StockSerialNo
          };
          if (!found) {
            acc.push({
              ImplementID: curr.ImplementID, ImplementName: curr.ImplementName, StocksSerialNos: [stocksSerialNos]
            });
          } else {
            found.StocksSerialNos.push(stocksSerialNos);
          }
          return acc;
        }, []);
      } else {
        this.toastr.info(`Either the Stocks have not been made available to districts or have already been initialised.`);
      }
    }, (error) => this.toastr.error(error.statusText, error.status));
  }

  checkUncheckAll() {
    this.implementStockSerialNoList.map((i: any) => i.StocksSerialNos.forEach((j: any) => { j.isSelected = this.masterSelected; }));
    this.getCheckedItemList();
  }

  isAllSelected() {
    this.masterSelected = this.implementStockSerialNoList.reduce((acc: any, curr: any) => {
      const res = curr.StocksSerialNos.every((j: any) => j.isSelected);
      acc.push(res);
      return acc;
    }, []).every((x: any) => x === true);
    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.checkedList = [];
    this.implementStockSerialNoList.map((i: any) => i.StocksSerialNos.forEach((j: any) => {
      if (j.isSelected) {
        this.checkedList.push({
          ImplementID: j.ImplementID, StockSerialNo: j.StockSerialNo
        });
      }
    }));
  }

  onSubmit() {
    if (this.selectedDistrict !== undefined && this.selectedDistrict !== null && this.selectedDistrict !== '' && this.selectedBlock !== undefined && this.selectedBlock !== null && this.selectedBlock !== '' && this.checkedList !== undefined) {
      const data = {
        DistrictCode: this.selectedDistrict.DistrictCode,
        BlockCode: this.selectedBlock.BlockCode,
        StocksSerialNos: this.checkedList
      };
      if (this.checkedList.length > 0) {
        this.eeService.submitStockInitialisation(data).subscribe((result: any) => {
          if (result[0] !== 'error') {
            if (result.length === 0) {
              this.toastr.info(`All the Stocks have already been initialised.`);
            }
            this.toastr.success(`The Stocks have been initialised for the district: "<b>${this.selectedDistrict.DistrictName}</b>" & block: "<b>${this.selectedBlock.BlockName}</b>" successfully.`);
            this.checkedList = [];
            const sd = this.selectedDistrict;
            this.siForm.reset();
            setTimeout(() => {
              this.selectedDistrict = sd;
              this.selectedBlock = '';
              this.implementStockSerialNoList = [];
              this.implementStockSerialNoList = result.reduce((acc: any, curr: any) => {
                const found = acc.find((x: any) => x.ImplementID === curr.ImplementID && x.ImplementName === curr.ImplementName);
                const stocksSerialNos = {
                  ImplementID: curr.ImplementID, StockSerialNo: curr.StockSerialNo
                };
                if (!found) {
                  acc.push({
                    ImplementID: curr.ImplementID, ImplementName: curr.ImplementName, StocksSerialNos: [stocksSerialNos]
                  });
                } else {
                  found.StocksSerialNos.push(stocksSerialNos);
                }
                return acc;
              }, []);
            }, 1);
            this.submitted = false;
          } else {
            this.toastr.error(`An error occurred! Please try again.`);
            this.submitted = true;
          }
        }, (error) => this.toastr.error(error.statusText, error.status));
      } else {
        this.toastr.warning('Please select Stock Serial Nos. for the Implements');
      }
    } else {
      this.toastr.warning('Please select the District, Block and Stock Serial Nos. for the Implements');
    }
  }
}