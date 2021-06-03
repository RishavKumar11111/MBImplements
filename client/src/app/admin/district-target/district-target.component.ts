import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { LayoutService } from '../../services/layout.service';
import { DistrictTarget } from '../../models/admin/district-target.model';

@Component({
  selector: 'app-district-target',
  templateUrl: './district-target.component.html',
  styleUrls: ['./district-target.component.css']
})
export class DistrictTargetComponent implements OnInit {
  title: string;
  breadcrumbs: Array<string>;
  implementList: Array<{ ImplementID: number, ImplementName: string }>;
  financialYears: Array<string>;
  districtTargetList: Array<any>;
  selectedFinancialYear: string;
  submitted: boolean;
  btnID: string;
  selectedImplement: any;
  totalNormal: any;
  totalSCP: any;
  totalTASP: any;
  grandTotal: any;

  constructor(
    private adminService: AdminService,
    private layoutService: LayoutService,
    private toastr: ToastrService
  ) {
    this.title = 'Implement\'s Target entry';
    this.breadcrumbs = ['Implement\'s Target entry', 'Target entry for Implements District-wise, Financial Year-wise and Category-wise'];
    this.implementList = [];
    this.financialYears = [];
    this.districtTargetList = [];
    this.selectedFinancialYear = '';
    this.submitted = false;
    this.btnID = '';
    this.selectedImplement = '';
  }

  @ViewChild('districtTargetForm') dtForm: any;

  ngOnInit(): void {
    // this.layoutService.currentTitle.subscribe((t: string) => this.title = t);
    this.layoutService.setTitle(this.title);
    // this.layoutService.currentBreadcrumbs.subscribe((bc: Array<string>) => this.breadcrumbs = bc);
    this.layoutService.setBreadcrumbs(this.breadcrumbs);
    this.loadAllImplements();
    this.loadFinancialYear();
  }

  loadAllImplements() {
    this.adminService.getAllImplements().subscribe((result: any) => {
      this.implementList = result;
    }, (error) => this.toastr.error(error.statusText, error.status));
  }

  loadFinancialYear() {
    this.adminService.getFinancialYear().subscribe((result: any) => {
      this.financialYears = result;
    }, (error) => this.toastr.error(error.statusText, error.status));
  }

  loadDistrictTargets() {
    if (this.selectedImplement !== undefined && this.selectedImplement !== null && this.selectedImplement !== '' && this.selectedFinancialYear !== undefined && this.selectedFinancialYear !== null && this.selectedFinancialYear !== '') {
      this.adminService.getDistrictTargets(this.selectedImplement.ImplementID, this.selectedFinancialYear).subscribe((result: any) => {
        this.districtTargetList = result;
        for (let i = 0; i < this.districtTargetList.length; i++) {
          this.calculateTotalDistrictWise(this.districtTargetList[i]);
        }
        this.calculateTotalNormal();
        this.calculateTotalSCP();
        this.calculateTotalTASP();
        if (this.grandTotal === 0) {
          this.totalNormal = '';
          this.totalSCP = '';
          this.totalTASP = '';
          this.grandTotal = '';
          this.districtTargetList.forEach((i: any) => {
            i.Normal = null;
            i.SCP = null;
            i.TASP = null;
            i.TotalDistrictWise = null;
          });
          this.submitted = false;
        } else {
          this.submitted = true;
        }
      }, (error) => this.toastr.error(error.statusText, error.status));
    }
  }

  calculateTotalDistrictWise(x: any) {
    const normal: number = (x.Normal === undefined || x.Normal == null || x.Normal === '') ? 0 : Number.isNaN(parseInt(x.Normal.toString().replace(/[^0-9]*/g, ''), 10)) ? 0 : parseInt(x.Normal.toString().replace(/[^0-9]*/g, ''), 10);
    const scp: number = (x.SCP === undefined || x.SCP == null || x.SCP === '') ? 0 : Number.isNaN(parseInt(x.SCP.toString().replace(/[^0-9]*/g, ''), 10)) ? 0 : parseInt(x.SCP.toString().replace(/[^0-9]*/g, ''), 10);
    const tasp: number = (x.TASP === undefined || x.TASP == null || x.TASP === '') ? 0 : Number.isNaN(parseInt(x.TASP.toString().replace(/[^0-9]*/g, ''), 10)) ? 0 : parseInt(x.TASP.toString().replace(/[^0-9]*/g, ''), 10);
    x.TotalDistrictWise = normal + scp + tasp;
  }

  calculateTotalNormal() {
    this.totalNormal = 0;
    for (let i = 0; i < this.districtTargetList.length; i++) {
      if (this.districtTargetList[i].Normal !== undefined && this.districtTargetList[i].Normal !== null && this.districtTargetList[i].Normal !== '') {
        this.totalNormal += Number.isNaN(parseInt(this.districtTargetList[i].Normal.toString().replace(/[^0-9]*/g, ''), 10)) ? 0 : parseInt(this.districtTargetList[i].Normal.toString().replace(/[^0-9]*/g, ''), 10);
      }
    }
    const scp: number = (this.totalSCP === undefined || this.totalSCP == null || this.totalSCP === '') ? 0 : this.totalSCP;
    const tasp: number = (this.totalTASP === undefined || this.totalTASP == null || this.totalTASP === '') ? 0 : this.totalTASP;
    this.grandTotal = this.totalNormal + scp + tasp;
  }

  calculateTotalSCP() {
    this.totalSCP = 0;
    for (let i = 0; i < this.districtTargetList.length; i++) {
      if (this.districtTargetList[i].SCP !== undefined && this.districtTargetList[i].SCP !== null && this.districtTargetList[i].SCP !== '') {
        this.totalSCP += Number.isNaN(parseInt(this.districtTargetList[i].SCP.toString().replace(/[^0-9]*/g, ''), 10)) ? 0 : parseInt(this.districtTargetList[i].SCP.toString().replace(/[^0-9]*/g, ''), 10);
      }
    }
    const normal: number = (this.totalNormal === undefined || this.totalNormal == null || this.totalNormal === '') ? 0 : this.totalNormal;
    const tasp: number = (this.totalTASP === undefined || this.totalTASP == null || this.totalTASP === '') ? 0 : this.totalTASP;
    this.grandTotal = normal + this.totalSCP + tasp;
  }

  calculateTotalTASP() {
    this.totalTASP = 0;
    for (let i = 0; i < this.districtTargetList.length; i++) {
      if (this.districtTargetList[i].TASP !== undefined && this.districtTargetList[i].TASP !== null && this.districtTargetList[i].TASP !== '') {
        this.totalTASP += Number.isNaN(parseInt(this.districtTargetList[i].TASP.toString().replace(/[^0-9]*/g, ''), 10)) ? 0 : parseInt(this.districtTargetList[i].TASP.toString().replace(/[^0-9]*/g, ''), 10);
      }
    }
    const normal: number = (this.totalNormal === undefined || this.totalNormal == null || this.totalNormal === '') ? 0 : this.totalNormal;
    const scp: number = (this.totalSCP === undefined || this.totalSCP == null || this.totalSCP === '') ? 0 : this.totalSCP;
    this.grandTotal = normal + scp + this.totalTASP;
  }

  onReset() {
    this.dtForm.reset();
    setTimeout(() => {
      this.selectedImplement = '';
      this.selectedFinancialYear = '';
      this.districtTargetList.forEach((i: any) => {
        delete i.Normal;
        delete i.SCP;
        delete i.TASP;
        delete i.TotalDistrictWise;
      });
      this.totalNormal = '';
      this.totalSCP = '';
      this.totalTASP = '';
      this.grandTotal = '';
    }, 1);
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
    if (this.selectedImplement !== undefined && this.selectedImplement !== null && this.selectedImplement !== '' && this.selectedFinancialYear !== undefined && this.selectedFinancialYear !== null && this.selectedFinancialYear !== '') {
      const normal: number = (this.totalNormal === undefined || this.totalNormal == null || this.totalNormal === '') ? 0 : this.totalNormal;
      const scp: number = (this.totalSCP === undefined || this.totalSCP == null || this.totalSCP === '') ? 0 : this.totalSCP;
      const tasp: number = (this.totalTASP === undefined || this.totalTASP == null || this.totalTASP === '') ? 0 : this.totalTASP;
      this.grandTotal = normal + scp + tasp;
      if (this.grandTotal !== 0) {
        const dl: any = [];
        for (let i = 0; i < this.districtTargetList.length; i++) {
          dl.push({
            DistrictCode: this.districtTargetList[i].DistrictCode, DistrictName: this.districtTargetList[i].DistrictName
          });
          delete this.districtTargetList[i].DistrictName;
          delete this.districtTargetList[i].TotalDistrictWise;
          delete this.districtTargetList[i].ImplementName;
          delete this.districtTargetList[i].ImplementID;
          delete this.districtTargetList[i].FinancialYear;
          delete this.districtTargetList[i].DateTime;
          delete this.districtTargetList[i].IPAddress;
          delete this.districtTargetList[i].UserID;
          this.districtTargetList[i].Normal = (!('Normal' in this.districtTargetList[i]) || this.districtTargetList[i].Normal == null) ? 0 : Number.isNaN(parseInt(this.districtTargetList[i].Normal.toString().replace(/[^0-9]*/g, ''), 10)) ? 0 : parseInt(this.districtTargetList[i].Normal.toString().replace(/[^0-9]*/g, ''), 10);
          this.districtTargetList[i].SCP = (!('SCP' in this.districtTargetList[i]) || this.districtTargetList[i].SCP == null) ? 0 : Number.isNaN(parseInt(this.districtTargetList[i].SCP.toString().replace(/[^0-9]*/g, ''), 10)) ? 0 : parseInt(this.districtTargetList[i].SCP.toString().replace(/[^0-9]*/g, ''), 10);
          this.districtTargetList[i].TASP = (!('TASP' in this.districtTargetList[i]) || this.districtTargetList[i].TASP == null) ? 0 : Number.isNaN(parseInt(this.districtTargetList[i].TASP.toString().replace(/[^0-9]*/g, ''), 10)) ? 0 : parseInt(this.districtTargetList[i].TASP.toString().replace(/[^0-9]*/g, ''), 10);
          this.districtTargetList[i].ImplementID = this.selectedImplement.ImplementID;
          this.districtTargetList[i].FinancialYear = this.selectedFinancialYear;
        }
        if ((this.btnID === 'submit') || document.activeElement!.id === 'submit') {
          this.adminService.submitDistrictTarget(this.districtTargetList).subscribe((result: any) => {
            if (result.length === this.districtTargetList.length) {
              this.toastr.success(`District targets for the implement: "<b>${this.selectedImplement.ImplementName}</b>" & financial year: "<b>${this.selectedFinancialYear}</b>" are submitted successfully.`);
              const si = this.selectedImplement;
              this.dtForm.reset();
              setTimeout(() => {
                this.selectedImplement = si;
                // this.selectedImplement = { ImplementID: result[0].ImplementID, ImplementName: result[0].ImplementName };
                this.selectedFinancialYear = result[0].FinancialYear;
                this.districtTargetList = result;
                for (let i = 0; i < this.districtTargetList.length; i++) {
                  this.calculateTotalDistrictWise(this.districtTargetList[i]);
                }
                this.calculateTotalNormal();
                this.calculateTotalSCP();
                this.calculateTotalTASP();
              }, 1);
              this.submitted = true;
            } else {
              this.districtTargetList = this.districtTargetList.map((item: any, i: any) => ((item.DistrictCode === dl[i].DistrictCode) ? ({
                ...item, ...dl[i]
              }) : {
              }));
              this.toastr.info(`District targets for the implement: "<b>${this.selectedImplement.ImplementName}</b>" & financial year: "<b>${this.selectedFinancialYear}</b>" are already submitted.`);
              this.onReset();
            }
          }, (error) => this.toastr.error(error.statusText, error.status));
        } else if ((this.btnID === 'update') || document.activeElement!.id === 'update') {
          this.adminService.updateDistrictTarget(this.districtTargetList).subscribe((result: any) => {
            this.toastr.success(`District targets for the implement: "<b>${this.selectedImplement.ImplementName}</b>" & financial year: "<b>${this.selectedFinancialYear}</b>" are updated successfully.`);
            const si = this.selectedImplement;
            this.dtForm.reset();
            setTimeout(() => {
              this.selectedImplement = si;
              // this.selectedImplement = { ImplementID: result[0].ImplementID, ImplementName: result[0].ImplementName };
              this.selectedFinancialYear = result[0].FinancialYear;
              this.districtTargetList = result;
              for (let i = 0; i < this.districtTargetList.length; i++) {
                this.calculateTotalDistrictWise(this.districtTargetList[i]);
              }
              this.calculateTotalNormal();
              this.calculateTotalSCP();
              this.calculateTotalTASP();
            }, 1);
            this.submitted = true;
          }, (error) => this.toastr.error(error.statusText, error.status));
        }
      } else {
        this.toastr.warning('Please enter target for atleast one category for a district.');
      }
    } else {
      this.toastr.warning('Please select the Implement and Financial Year.');
    }
  }
}