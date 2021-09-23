import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ManufacturerService } from '../../services/manufacturer.service';
import { LayoutService } from '../../services/layout.service';
import { StockSerialNosDialogComponent } from './stock-serial-nos-dialog/stock-serial-nos-dialog.component';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit {
  title: string;
  breadcrumbs: Array<string>;
  implementList: Array<{ ImplementID: number, ImplementName: string }>;
  uniqueFarmID: string;
  year: string;
  keyName: string;
  stockSerialNos: Array<{ StockSerialNo: string }>;
  tempStockSerialNos: Array<{ StockSerialNo: string }>;
  preferredSupplierList: Array<{ SupplierID: number, SupplierName: string }>;
  stockSerialNoList: Array<{ StockSerialNo: string }>;
  countExistingStockSerialNos: number;

  addStockForm: FormGroup;
  @ViewChild('addStockFormID') amipFormID: any;

  constructor(
    private manufacturerService: ManufacturerService,
    private layoutService: LayoutService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.title = 'Add Stock Details';
    this.breadcrumbs = ['Add Stock Details', 'Entry of Stock Serial Nos. Implement-wise'];
    this.implementList = [];
    this.uniqueFarmID = '';
    this.year = '';
    this.keyName = '';
    this.stockSerialNos = [];
    this.tempStockSerialNos = [];
    this.preferredSupplierList = [{
      SupplierID: 1,
      SupplierName: 'OAIC'
    },
    {
      SupplierID: 2,
      SupplierName: 'OSIC'
    },
    {
      SupplierID: 3,
      SupplierName: 'OFMRDC'
    },
    {
      SupplierID: 4,
      SupplierName: 'ALL'
    }];
    this.stockSerialNoList = [];
    this.countExistingStockSerialNos = 0;

    this.addStockForm = this.fb.group({
      selectedImplement: ['', Validators.required],
      enteredImplementForInspectionNo: ['', Validators.required],
      selectedStockSerialNoEntryType: ['Individual', Validators.required],
      enteredIndividualStockSerialNo: ['', Validators.pattern('^(?!0{4})\\d{4}$')],
      enteredFromSequencialStockSerialNo: ['', Validators.pattern('^(?![09]{4})\\d{4}$')],
      enteredToSequencialStockSerialNo: ['', Validators.pattern('^(?!0{4})\\d{4}$')],
      selectedPreferredSupplier: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // this.layoutService.currentTitle.subscribe((t: string) => this.title = t);
    this.layoutService.setTitle(this.title);
    // this.layoutService.currentBreadcrumbs.subscribe((bc: Array<string>) => this.breadcrumbs = bc);
    this.layoutService.setBreadcrumbs(this.breadcrumbs);
    this.loadAllImplements();
    this.loadUniqueFarmIDYear();
  }

  get f() { return this.addStockForm.controls; }
  get selectedImplement() { return this.addStockForm.get('selectedImplement'); }
  get enteredImplementForInspectionNo() { return this.addStockForm.get('enteredImplementForInspectionNo'); }
  get selectedStockSerialNoEntryType() { return this.addStockForm.get('selectedStockSerialNoEntryType'); }
  get enteredIndividualStockSerialNo() { return this.addStockForm.get('enteredIndividualStockSerialNo'); }
  get enteredFromSequencialStockSerialNo() { return this.addStockForm.get('enteredFromSequencialStockSerialNo'); }
  get enteredToSequencialStockSerialNo() { return this.addStockForm.get('enteredToSequencialStockSerialNo'); }
  get selectedPreferredSupplier() { return this.addStockForm.get('selectedPreferredSupplier'); }

  loadAllImplements() {
    this.manufacturerService.getAllImplements().subscribe((result: any) => {
      this.implementList = result;
    }, (error) => this.toastr.error(error.statusText, error.status));
  }

  loadUniqueFarmIDYear() {
    this.manufacturerService.getUniqueFarmIDYear().subscribe((result: any) => {
      this.uniqueFarmID = result[0].UniqueFarmID;
      this.year = result[1].Year;
    }, (error) => this.toastr.error(error.statusText, error.status));
  }

  loadStockSerialNos() {
    this.manufacturerService.getStockSerialNos(this.selectedImplement!.value.ImplementID).subscribe((result: any) => {
      this.stockSerialNoList = result;
    }, (error) => this.toastr.error(error.statusText, error.status));
  }

  resetIndividualField() {
    this.addStockForm.patchValue({
      enteredIndividualStockSerialNo: ''
    });
  }

  resetSequencialField() {
    this.addStockForm.patchValue({
      enteredFromSequencialStockSerialNo: '',
      enteredToSequencialStockSerialNo: ''
    });
  }

  addStockSerialNos() {
    if (this.enteredImplementForInspectionNo!.valid) {
      if (this.stockSerialNos.length < this.enteredImplementForInspectionNo!.value) {
        if (this.selectedStockSerialNoEntryType!.value === 'Individual' && this.enteredIndividualStockSerialNo!.valid) {
          if (this.enteredIndividualStockSerialNo!.value !== null && this.enteredIndividualStockSerialNo!.value !== undefined && this.enteredIndividualStockSerialNo!.value !== '') {
            const found1 = this.stockSerialNos.findIndex((x: any) => x.StockSerialNo === `${this.uniqueFarmID}/${this.enteredIndividualStockSerialNo!.value}/${this.year}`);
            const found2 = this.stockSerialNoList.findIndex((x: any) => x.StockSerialNo === `${this.uniqueFarmID}/${this.enteredIndividualStockSerialNo!.value}/${this.year}`);
            if (found1 === -1 && found2 === -1) {
              this.stockSerialNos.push({
                StockSerialNo: `${this.uniqueFarmID}/${this.enteredIndividualStockSerialNo!.value}/${this.year}`
              });
              this.stockSerialNos.sort((a: any, b: any) => parseInt(a.StockSerialNo.substring(4, 8), 10) - parseInt(b.StockSerialNo.substring(4, 8), 10));
              this.tempStockSerialNos = [...this.stockSerialNos];
              this.toastr.info(`The Stock Serial No. <b>${this.uniqueFarmID}/${this.enteredIndividualStockSerialNo!.value}/${this.year}</b> is added to the list.`);
            } else {
              this.toastr.warning(`The Stock Serial No. <b>${this.uniqueFarmID}/${this.enteredIndividualStockSerialNo!.value}/${this.year}</b> is already entered.`);
            }
            this.resetIndividualField();
          } else {
            this.toastr.warning('Please enter a Stock Serial No.');
          }
        } else if (this.selectedStockSerialNoEntryType!.value === 'Sequencial' && this.enteredFromSequencialStockSerialNo!.valid && this.enteredToSequencialStockSerialNo!.valid) {
          if (this.enteredFromSequencialStockSerialNo!.value !== null && this.enteredFromSequencialStockSerialNo!.value !== undefined && this.enteredFromSequencialStockSerialNo!.value !== '' && this.enteredToSequencialStockSerialNo!.value !== null && this.enteredToSequencialStockSerialNo!.value !== undefined && this.enteredToSequencialStockSerialNo!.value !== '') {
            if (this.enteredFromSequencialStockSerialNo!.value !== this.enteredToSequencialStockSerialNo!.value) {
              if (parseInt(this.enteredFromSequencialStockSerialNo!.value, 10) < parseInt(this.enteredToSequencialStockSerialNo!.value, 10)) {
                const found1 = this.stockSerialNos.findIndex((x: any) => x.StockSerialNo === `${this.uniqueFarmID}/${this.enteredFromSequencialStockSerialNo!.value}/${this.year}`);
                const found4 = this.stockSerialNoList.findIndex((x: any) => x.StockSerialNo === `${this.uniqueFarmID}/${this.enteredFromSequencialStockSerialNo!.value}/${this.year}`);
                if (found1 === -1 && found4 === -1) {
                  const found2 = this.stockSerialNos.findIndex((x: any) => x.StockSerialNo === `${this.uniqueFarmID}/${this.enteredToSequencialStockSerialNo!.value}/${this.year}`);
                  const found5 = this.stockSerialNoList.findIndex((x: any) => x.StockSerialNo === `${this.uniqueFarmID}/${this.enteredToSequencialStockSerialNo!.value}/${this.year}`);
                  if (found2 === -1 && found5 === -1) {
                    const totalStockSerialNos = parseInt(this.enteredToSequencialStockSerialNo!.value, 10) - parseInt(this.enteredFromSequencialStockSerialNo!.value, 10) + 1;
                    let slNo = parseInt(this.enteredFromSequencialStockSerialNo!.value, 10);
                    let modifiedSlNo = '';
                    let counter = 0;
                    for (let i = 0; i < totalStockSerialNos; i++) {
                      if (slNo >= 1 && slNo <= 9) {
                        modifiedSlNo = `000${slNo++}`;
                      } else if (slNo >= 10 && slNo <= 99) {
                        modifiedSlNo = `00${slNo++}`;
                      } else if (slNo >= 100 && slNo <= 999) {
                        modifiedSlNo = `0${slNo++}`;
                      } else if (slNo >= 1000 && slNo <= 9999) {
                        modifiedSlNo = `${slNo++}`;
                      }
                      const found3 = this.stockSerialNos.findIndex((x: any) => x.StockSerialNo === `${this.uniqueFarmID}/${modifiedSlNo}/${this.year}`);
                      const found6 = this.stockSerialNoList.findIndex((x: any) => x.StockSerialNo === `${this.uniqueFarmID}/${modifiedSlNo}/${this.year}`);
                      if (found3 === -1) {
                        if (found6 === -1) {
                          this.tempStockSerialNos.push({
                            StockSerialNo: `${this.uniqueFarmID}/${modifiedSlNo}/${this.year}`
                          });
                        } else {
                          this.countExistingStockSerialNos = ++counter;
                        }
                      }
                    }
                    this.tempStockSerialNos.sort((a: any, b: any) => parseInt(a.StockSerialNo.substring(4, 8), 10) - parseInt(b.StockSerialNo.substring(4, 8), 10));
                    if (this.tempStockSerialNos.length <= this.enteredImplementForInspectionNo!.value) {
                      this.stockSerialNos = [...new Set([...this.stockSerialNos, ...this.tempStockSerialNos])].sort((a: any, b: any) => parseInt(a.StockSerialNo.substring(4, 8), 10) - parseInt(b.StockSerialNo.substring(4, 8), 10));
                      this.toastr.info(`The Stock Serial Nos. from <b>${this.uniqueFarmID}/${this.enteredFromSequencialStockSerialNo!.value}/${this.year}</b> to <b>${this.uniqueFarmID}/${this.enteredToSequencialStockSerialNo!.value}/${this.year}</b> are added to the list.`);
                    } else {
                      this.toastr.warning(`The Total no. of Stock Serial Nos. can't exceed the entered no. of Implements ready for Pre-delivery Inspection. i.e. <b>${this.enteredImplementForInspectionNo!.value}</b>`);
                      this.tempStockSerialNos = [...this.stockSerialNos];
                    }
                    this.resetSequencialField();
                  } else {
                    this.toastr.warning(`The Ending Stock Serial No. <b>${this.uniqueFarmID}/${this.enteredToSequencialStockSerialNo!.value}/${this.year}</b> is already entered.`);
                    this.addStockForm.patchValue({
                      enteredToSequencialStockSerialNo: ''
                    });
                  }
                } else {
                  this.toastr.warning(`The Starting Stock Serial No. <b>${this.uniqueFarmID}/${this.enteredFromSequencialStockSerialNo!.value}/${this.year}</b> is already entered.`);
                  this.addStockForm.patchValue({
                    enteredFromSequencialStockSerialNo: ''
                  });
                }
              } else {
                this.toastr.warning(`The Starting Stock Serial No. must be numerically less than the Ending Stock Serial No.`);
                this.resetSequencialField();
              }
            } else {
              this.toastr.warning(`Both the Starting & Ending Stock Serial Nos. can't be same.`);
              this.resetSequencialField();
            }
          } else {
            this.toastr.warning('Please enter a Starting and Ending Stock Serial No.');
          }
        } else {
          this.toastr.warning('Please enter a valid Stock Serial No.');
        }
      } else {
        this.toastr.warning(`The Total no. of Stock Serial Nos. can't exceed the entered no. of Implements ready for Pre-delivery Inspection. i.e. <b>${this.enteredImplementForInspectionNo!.value}</b>`);
      }
    } else {
      this.toastr.warning('Please enter the Total no. of Inspections ready for Pre-delivery Inspection.');
    }
  }

  openStockSerialNosDialog() {
    const dialogRef = this.dialog.open(StockSerialNosDialogComponent, {
      height: '640px',
      width: '600px',
      data: {
        stockSerialNos: this.stockSerialNos,
        tempStockSerialNos: this.tempStockSerialNos
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      // console.log(this.stockSerialNos, this.tempStockSerialNos);
      // if (result !== undefined && result !== null && result !== '') {
      //   console.log(result.data);
      // }
    });
  }

  onSubmit() {
    if (this.addStockForm.valid) {
      if (this.stockSerialNos.length > 0) {
        if (this.stockSerialNos.length + this.countExistingStockSerialNos === parseInt(this.enteredImplementForInspectionNo!.value, 10)) {
          const data = {
            ImplementID: this.selectedImplement!.value.ImplementID,
            StockSerialNos: this.stockSerialNos,
            PreferredSupplier: this.selectedPreferredSupplier!.value.SupplierName
          };
          this.manufacturerService.submitStockSerialNos(data).subscribe((result: any) => {
            if (result.length === this.stockSerialNos.length) {
              this.toastr.success(`The Stock Serial Nos. have been submitted for the Implement <b>${this.selectedImplement!.value.ImplementName}</b> & Year <b>${this.year}</b>.`);
            } else {
              this.toastr.warning(`The Stock Serial Nos. have already been submitted for the Implement <b>${this.selectedImplement!.value.ImplementName}</b> & Year <b>${this.year}</b>. Please enter different Stock Serial Nos.`);
            }
            this.stockSerialNos = [];
            this.tempStockSerialNos = [];
            this.countExistingStockSerialNos = 0;
            this.addStockForm.reset();
            setTimeout(() => {
              this.addStockForm.patchValue({
                selectedImplement: '',
                selectedStockSerialNoEntryType: 'Individual',
                selectedPreferredSupplier: ''
              });
            }, 1);
          });
        } else {
          this.toastr.warning('The entered Total No. of Implements ready for Pre-delivery Inspection must be match with the no. of items in the list of Stock Serial Nos.');
        }
      } else {
        this.toastr.warning('Please enter the Stock Serial Nos. individually or sequencially and click the <b>Add</b> button.');
      }
    } else {
      this.toastr.warning('Please select the Implement & Preferred List of Suppliers and enter the Total No. of Implements for Pre-delievery Inspection.');
    }
  }
}