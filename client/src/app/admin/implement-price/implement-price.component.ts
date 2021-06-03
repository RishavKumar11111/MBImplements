import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { LayoutService } from '../../services/layout.service';
import { ImplementPrice } from '../../models/admin/implement-price.model';

@Component({
  selector: 'app-implement-price',
  templateUrl: './implement-price.component.html',
  styleUrls: ['./implement-price.component.css']
})
export class ImplementPriceComponent implements OnInit {
  title: string;
  breadcrumbs: Array<string>;
  implementPriceList: Array<any>;
  submitted: boolean;
  btnID: string;

  implementPriceForm: any;
  @ViewChild('implementPriceFormID') ipFormID: any;

  constructor(
    private adminService: AdminService,
    private layoutService: LayoutService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.implementPriceList = [];
    this.submitted = false;
    this.btnID = '';
    this.title = 'Implement\'s Price entry';
    this.breadcrumbs = ['Implement\'s Price entry', 'Price entry of Implements Financial Year-wise'];

    this.implementPriceForm = this.fb.group({
      selectedImplement: ['', Validators.required],
      enteredPrice: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // this.layoutService.currentTitle.subscribe((t: string) => this.title = t);
    this.layoutService.setTitle(this.title);
    // this.layoutService.currentBreadcrumbs.subscribe((bc: Array<string>) => this.breadcrumbs = bc);
    this.layoutService.setBreadcrumbs(this.breadcrumbs);
    this.loadAllImplementPrices();
  }

  get f() { return this.implementPriceForm.controls; }
  get selectedImplement() { return this.implementPriceForm.get('selectedImplement'); }
  get enteredPrice() { return this.implementPriceForm.get('enteredPrice'); }

  loadAllImplementPrices() {
    this.adminService.getAllImplementPrices().subscribe((result: any) => {
      this.implementPriceList = result;
    }, (error) => this.toastr.error(error.statusText, error.status));
  }

  populateImplementCost() {
    this.implementPriceForm.patchValue({
      enteredPrice: this.implementPriceList.filter((e: any) => e.ImplementID === this.selectedImplement.value.ImplementID)[0].Cost
    });
    const filtered = this.implementPriceList.filter((e: any) => e.ImplementID === this.selectedImplement.value.ImplementID);
    if (filtered[0].DateTime == null) {
      this.submitted = false;
    } else {
      this.submitted = true;
    }
  }

  keyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      if (document.getElementById('submit')) {
        this.btnID = document.getElementById('submit')!.id;
        return this.btnID;
      } if (document.getElementById('update')) {
        this.btnID = document.getElementById('update')!.id;
        return this.btnID;
      }
    }
    this.btnID = '';
    return this.btnID;
  }

  onSubmit() {
    if (this.implementPriceForm.valid) {
      if ((this.btnID === 'submit') || document.activeElement!.id === 'submit') {
        this.adminService.submitImplementPrice(this.implementPriceForm.value).subscribe((result: any) => {
          this.toastr.success(`Price for the implement: "<b>${this.selectedImplement.value.ImplementName}</b>" has been entered successfully.`);
          this.implementPriceForm.reset();
          setTimeout(() => {
            this.implementPriceForm.patchValue({
              selectedImplement: '',
              enteredPrice: ''
            });
          }, 1);
          this.loadAllImplementPrices();
        }, (error) => this.toastr.error(error.statusText, error.status));
        this.submitted = false;
      } else if ((this.btnID === 'update') || document.activeElement!.id === 'update') {
        this.adminService.updateImplementPrice(this.implementPriceForm.value).subscribe((result: any) => {
          this.toastr.success(`Price for the implement: "<b>${this.selectedImplement.value.ImplementName}</b>" has been modified successfully.`);
          this.implementPriceForm.reset();
          setTimeout(() => {
            this.implementPriceForm.patchValue({
              selectedImplement: '',
              enteredPrice: ''
            });
          }, 1);
          this.loadAllImplementPrices();
        }, (error) => this.toastr.error(error.statusText, error.status));
        this.submitted = true;
      }
    }
  }
}