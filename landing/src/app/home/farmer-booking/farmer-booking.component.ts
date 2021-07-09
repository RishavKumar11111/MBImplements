import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { STEP_STATE } from '@angular/cdk/stepper';
import { HomeService } from '../../services/home.service';
import { CaptchaComponent } from '../captcha/captcha.component';

@Component({
  selector: 'app-farmer-booking',
  templateUrl: './farmer-booking.component.html',
  styleUrls: ['./farmer-booking.component.css']
})
export class FarmerBookingComponent implements OnInit {
  loading: boolean;
  keyName: string;
  farmerDetails: any;
  districtList: Array<{ DistrictCode: number, DistrictName: string, PDSDistrictName: string }>;
  blockList: Array<{ BlockCode: number, BlockName: string }>;
  gpList: Array<{ GPCode: number, GPName: string }>;
  villageList: Array<{ VillageCode: number, VillageName: string }>;
  sd: any;
  sb: any;
  sg: any;
  sv: any;
  implementDetailList: Array<{ ImplementID: number, ImplementName: string, Cost: number, SubsidyPercentage: number }>;
  showImplementDetails: boolean;
  showProceedToPayment: boolean;
  captchaValue: any;
  captchaResult: any;

  captchaConfig: any = {
    type: 2,
    length: 6,
    cssClass: 'custom',
    back: {
      stroke: '#2F9688',
      solid: '#f2efd2'
    },
    font: {
      color: '#000000',
      size: '84px',
      family: 'Arial'
    }
  };

  @ViewChild('stepper') stepper: any;
  farmerBookingForm: FormGroup;
  @ViewChild('farmerBookingFormID') fbfFormID: any;
  @ViewChild('captchaFormID') cFormID: any;
  @ViewChild(CaptchaComponent) private cc!: CaptchaComponent;

  constructor(
    private homeService: HomeService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.loading = false;
    this.keyName = '';
    this.districtList = [];
    this.blockList = [];
    this.gpList = [];
    this.villageList = [];
    this.implementDetailList = [];
    this.showImplementDetails = false;
    this.showProceedToPayment = false;

    this.farmerBookingForm = this.fb.group({
      enteredFarmerID: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{1,3}\/[1-9][0-9]{0,6}$/)]],
      enteredFarmerName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      enteredFarmerMobileNo: ['', [Validators.required, Validators.pattern(/^[6-9][0-9]{9}$/)]],
      selectedDistrict: ['', Validators.required],
      selectedBlock: ['', Validators.required],
      selectedGP: ['', Validators.required],
      selectedVillage: ['', Validators.required],
      selectedImplement: ['', Validators.required],
      implementCost: ['', Validators.required],
      implmenetSubsidyPercentage: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.farmerDetails = null;
    this.sd = null;
    this.sb = null;
    this.sg = null;
    this.sv = null;
    this.captchaValue = null;
    this.captchaResult = null;
    this.loadDistricts();
    this.loadImplementDetails();
    this.enteredFarmerName!.disable();
    this.enteredFarmerMobileNo!.disable();
    this.selectedDistrict!.disable();
    this.selectedBlock!.disable();
    this.selectedGP!.disable();
    this.selectedVillage!.disable();
    this.implementCost!.disable();
    this.implmenetSubsidyPercentage!.disable();
  }

  get fbf() { return this.farmerBookingForm.controls; }
  get enteredFarmerID() { return this.farmerBookingForm.get('enteredFarmerID'); }
  get enteredFarmerName() { return this.farmerBookingForm.get('enteredFarmerName'); }
  get enteredFarmerMobileNo() { return this.farmerBookingForm.get('enteredFarmerMobileNo'); }
  get selectedDistrict() { return this.farmerBookingForm.get('selectedDistrict'); }
  get selectedBlock() { return this.farmerBookingForm.get('selectedBlock'); }
  get selectedGP() { return this.farmerBookingForm.get('selectedGP'); }
  get selectedVillage() { return this.farmerBookingForm.get('selectedVillage'); }
  get selectedImplement() { return this.farmerBookingForm.get('selectedImplement'); }
  get implementCost() { return this.farmerBookingForm.get('implementCost'); }
  get implmenetSubsidyPercentage() { return this.farmerBookingForm.get('implmenetSubsidyPercentage'); }

  // ngAfterViewInit() {
  //   this.stepper._getIndicatorType = () => STEP_STATE.NUMBER;
  // }

  concatString(e: any) {
    if (this.enteredFarmerID!.value !== null && this.enteredFarmerID!.value !== undefined && this.enteredFarmerID!.value !== '') {
      if (this.enteredFarmerID!.value.length === 3 && this.keyName !== 'Backspace') {
        this.farmerBookingForm.patchValue({
          enteredFarmerID: `${e}/`
        });
      } else if ((this.enteredFarmerID!.value.length === 3 && this.keyName === 'Backspace') || (this.enteredFarmerID!.value.length === 5 && this.keyName === '/')) {
        this.farmerBookingForm.patchValue({
          enteredFarmerID: e.slice(0, -1)
        });
      }
    }
  }

  keyDown(event: KeyboardEvent) {
    this.keyName = '';
    if (event.key === 'Backspace') {
      this.keyName = 'Backspace';
    } else if (event.key === '/') {
      this.keyName = '/';
    } else if (event.key === 'Enter') {
      let checkButtonDisabled: any;
      checkButtonDisabled = document.getElementById('getFD');
      if (checkButtonDisabled !== null) {
        if (!checkButtonDisabled.disabled) {
          this.getFarmerDetails();
        }
      } else {
        checkButtonDisabled = document.getElementById('submit');
        if (checkButtonDisabled !== null) {
          if (!checkButtonDisabled.disabled) {
            this.onSubmit();
          }
        }
      }
    }
  }

  getFarmerDetails() {
    if (this.enteredFarmerID!.value !== null && this.enteredFarmerID!.value !== '' && this.enteredFarmerID!.value !== undefined) {
      this.loading = true;
      this.homeService.getFarmerDetails(this.enteredFarmerID!.value.toUpperCase()).subscribe((result: any) => {
        this.loading = false;
        this.showProceedToPayment = false;
        if (result !== null || result !== undefined) {
          if (result.ErrorMessage === null) {
            if (result.VCHAADHARNO !== null) {
              if (result.VCHFARMERNAME !== null && result.VCHFARMERNAME !== '') {
                this.enteredFarmerName!.disable();
              } else {
                this.enteredFarmerName!.enable();
              }
              if (result.VCHMOBILENO !== null && result.VCHMOBILENO !== '') {
                this.enteredFarmerMobileNo!.disable();
              } else {
                this.enteredFarmerMobileNo!.enable();
              }
              if (result.LGDVillageCode !== null) {
                this.loadFarmerAddress(result.LGDVillageCode);
                this.selectedDistrict!.clearValidators();
                this.selectedDistrict!.updateValueAndValidity();
                this.selectedBlock!.clearValidators();
                this.selectedBlock!.updateValueAndValidity();
                this.selectedGP!.clearValidators();
                this.selectedGP!.updateValueAndValidity();
                this.selectedVillage!.clearValidators();
                this.selectedVillage!.updateValueAndValidity();
                this.selectedDistrict!.disable();
                this.selectedBlock!.disable();
                this.selectedGP!.disable();
                this.selectedVillage!.disable();
              } else {
                this.loadFarmerDistrict();
                this.selectedDistrict!.clearValidators();
                this.selectedDistrict!.updateValueAndValidity();
                this.selectedBlock!.setValidators([Validators.required]);
                this.selectedBlock!.updateValueAndValidity();
                this.selectedGP!.setValidators([Validators.required]);
                this.selectedGP!.updateValueAndValidity();
                this.selectedVillage!.setValidators([Validators.required]);
                this.selectedVillage!.updateValueAndValidity();
                this.selectedDistrict!.disable();
                this.selectedBlock!.enable();
                this.selectedGP!.enable();
                this.selectedVillage!.enable();
              }
              this.farmerDetails = result;
              this.enteredFarmerID!.disable();
              this.farmerBookingForm.patchValue({
                enteredFarmerName: this.farmerDetails.VCHFARMERNAME !== null && this.farmerDetails.VCHFARMERNAME !== '' ? this.farmerDetails.VCHFARMERNAME.trim().replace(/\s+/g, ' ').toLowerCase().split(' ')
                  .map((x: string) => x.charAt(0).toUpperCase() + x.slice(1))
                  .join(' ') : this.enteredFarmerName!.value.toLowerCase().split(' ').map((x: string) => x.charAt(0).toUpperCase() + x.slice(1)).join(' '),
                enteredFarmerMobileNo: this.farmerDetails.VCHMOBILENO !== null && this.farmerDetails.VCHMOBILENO !== '' ? this.farmerDetails.VCHMOBILENO.trim().slice(-10) : this.enteredFarmerMobileNo!.value
              });
            } else {
              this.toastr.warning(`The Aadhaar No. is not linked with the entered <b>Farmer ID: ${this.enteredFarmerID!.value.toUpperCase()}</b>.\nPlease update your Aadhaar No. at the nearest AAO.`);
              this.reset();
            }
          } else {
            this.toastr.warning(`The <b>Farmer ID: ${this.enteredFarmerID!.value.toUpperCase()}</b> is invalid.`);
            this.reset();
          }
        } else {
          this.toastr.warning(`No record found for the <b>Farmer ID: ${this.enteredFarmerID!.value.toUpperCase()}</b>.`);
          this.reset();
        }
      }, (error) => this.toastr.error(error.statusText, error.status));
    } else {
      this.toastr.warning(`Please enter a Farmer ID.`);
    }
  }

  reset() {
    this.farmerDetails = null;
    this.blockList = [];
    this.gpList = [];
    this.villageList = [];
    this.sd = null;
    this.sb = null;
    this.sg = null;
    this.sv = null;
    this.enteredFarmerID!.enable();
    this.enteredFarmerName!.disable();
    this.enteredFarmerMobileNo!.disable();
    this.selectedDistrict!.disable();
    this.selectedBlock!.disable();
    this.selectedGP!.disable();
    this.selectedVillage!.disable();
    this.showImplementDetails = false;
    setTimeout(() => {
      this.farmerBookingForm.reset();
      this.farmerBookingForm.patchValue({
        enteredFarmerID: ''
      });
      this.farmerBookingForm.markAsPristine();
    }, 1);
  }

  loadDistricts() {
    this.homeService.getDistricts().subscribe((result: any) => {
      this.districtList = result;
    }, (error) => this.toastr.error(error.statusText, error.status));
  }

  loadBlocks(x: any) {
    return new Promise((resolve, reject) => {
      if (x !== null && x !== undefined && x !== '') {
        try {
          this.homeService.getBlocks(x.DistrictCode).subscribe((result: any) => {
            this.blockList = result;
            resolve(result);
          }, (error) => this.toastr.error(error.statusText, error.status));
        } catch (e) {
          reject(new Error(`Oops! An error occurred: ${e}`));
        }
      }
    });
  }

  loadGPs(x: any) {
    return new Promise((resolve, reject) => {
      if (x !== null && x !== undefined && x !== '') {
        try {
          this.homeService.getGPs(x.BlockCode).subscribe((result: any) => {
            this.gpList = result;
            resolve(result);
          }, (error) => this.toastr.error(error.statusText, error.status));
        } catch (e) {
          reject(new Error(`Oops! An error occurred: ${e}`));
        }
      }
    });
  }

  loadVillages(x: any) {
    return new Promise((resolve, reject) => {
      if (x !== null && x !== undefined && x !== '') {
        try {
          this.homeService.getVillages(x.GPCode).subscribe((result: any) => {
            this.villageList = result;
            resolve(result);
          }, (error) => this.toastr.error(error.statusText, error.status));
        } catch (e) {
          reject(new Error(`Oops! An error occurred: ${e}`));
        }
      }
    });
  }

  loadFarmerDistrict() {
    setTimeout(() => {
      this.sd = this.districtList.find((x: any) => x.PDSDistrictName.substring(0, 3) === this.enteredFarmerID!.value.toUpperCase().substring(0, 3));
      this.loadBlocks(this.sd);
    }, 1);
  }

  loadFarmerAddress(VillageCode: number) {
    this.homeService.getFarmerAddress(VillageCode).subscribe(async (result: any) => {
      this.sd = this.districtList.find((x: any) => x.DistrictCode === result[0].DistrictCode);
      await this.loadBlocks(this.sd);
      setTimeout(async () => {
        this.sb = this.blockList.find((x: any) => x.BlockCode === result[0].BlockCode);
        await this.loadGPs(this.sb);
        setTimeout(async () => {
          this.sg = this.gpList.find((x: any) => x.GPCode === result[0].GPCode);
          await this.loadVillages(this.sg);
          setTimeout(() => {
            this.sv = this.villageList.find((x: any) => x.VillageCode === result[0].VillageCode);
          }, 1);
        }, 1);
      }, 1);
    }, (error) => this.toastr.error(error.statusText, error.status));
  }

  loadImplementDetails() {
    this.homeService.getImplementDetails().subscribe((result: any) => {
      this.implementDetailList = result;
    }, (error) => this.toastr.error(error.statusText, error.status));
  }

  displayImplementDetails() {
    if (this.selectedImplement!.value !== null && this.selectedImplement!.value !== undefined && this.selectedImplement!.value !== '') {
      this.showImplementDetails = true;
      this.farmerBookingForm.patchValue({
        implementCost: `₹ ${this.selectedImplement!.value.Cost}`,
        implmenetSubsidyPercentage: `${this.selectedImplement!.value.SubsidyPercentage} %`
      });
    }
  }

  onSubmit() {
    if (this.farmerBookingForm.valid) {
      if (this.captchaValue !== null && this.captchaValue !== undefined && this.captchaValue !== '') {
        const cv = parseInt(this.captchaValue, 10);
        if (cv === this.captchaResult) {
          const data = {
            FarmerID: this.enteredFarmerID!.value.toUpperCase(),
            FarmerName: this.farmerDetails.VCHFARMERNAME !== null && this.farmerDetails.VCHFARMERNAME !== '' ? this.farmerDetails.VCHFARMERNAME.trim().replace(/\s+/g, ' ').toLowerCase().split(' ')
              .map((x: string) => x.charAt(0).toUpperCase() + x.slice(1))
              .join(' ') : this.enteredFarmerName!.value.toLowerCase().split(' ').map((x: string) => x.charAt(0).toUpperCase() + x.slice(1)).join(' '),
            FarmerMobileNo: this.farmerDetails.VCHMOBILENO !== null && this.farmerDetails.VCHMOBILENO !== '' ? this.farmerDetails.VCHMOBILENO.trim().slice(-10) : this.enteredFarmerMobileNo!.value,
            DistrictCode: this.sd.DistrictCode,
            BlockCode: this.sb.BlockCode,
            GPCode: this.sg.GPCode,
            VillageCode: this.sv.VillageCode,
            ImplementID: this.selectedImplement!.value.ImplementID,
            Captcha: cv
          };
          this.homeService.submitFarmerBooking(data).subscribe((result: any) => {
            if (!('message' in result)) {
              if (result.length === 1) {
                this.toastr.success(`The Booking is done successfully. Your Reference No. is "<b>${result[0].ReferenceNo}</b>". Please note the above Reference No. and proceed to payement.`);
                this.showProceedToPayment = true;
              } else {
                this.toastr.error(`Oops! An error has occurred. Please try again after sometime.`);
              }
              this.reset();
            } else {
              this.toastr.error(`Please enter the correct <b>Captcha</b> value to complete the booking process.`);
              this.cFormID.captchaForm.reset();
              this.cFormID.captchaForm.markAsPristine();
              this.cc.generateCaptchaAndSalt();
            }
          }, (error) => this.toastr.error(error.statusText, error.status));
        } else {
          this.toastr.error(`Please enter the correct <b>Captcha</b> value to complete the booking process.`);
          this.cFormID.captchaForm.reset();
          this.cFormID.captchaForm.markAsPristine();
          this.cc.generateCaptchaAndSalt();
        }
      } else {
        this.toastr.warning(`Please enter the captcha.`);
      }
    }
  }

  enteredCaptcha(e: any) {
    this.captchaValue = e.captchaInput.value;
    this.captchaResult = e.captchaResult;
  }
}