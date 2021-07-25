import { Component, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { STEP_STATE } from '@angular/cdk/stepper';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { HomeService } from '../../services/home.service';
import { CaptchaComponent } from '../captcha/captcha.component';
import { ManufacturerDetails } from '../../models/home/manufacturer-details.model';

@Component({
  selector: 'app-manufacturer-registration',
  templateUrl: './manufacturer-registration.component.html',
  styleUrls: ['./manufacturer-registration.component.css']
})
export class ManufacturerRegistrationComponent implements OnInit {
  loading: boolean;
  districtList: Array<{ DistrictCode: number, DistrictName: string, PDSDistrictName: string }>;
  blockList: Array<{ BlockCode: number, BlockName: string }>;
  isProprietorEmailIDAvailable: boolean;
  isUniqueFarmIDAvailable: boolean;
  captchaValue: any;
  captchaResult: any;
  base64FileDMRC: any;
  base64FileUA: any;
  base64FileBRCD: any;
  base64FileCOOOR: any;
  base64FilePMU: any;
  dmrc: any;
  ua: any;
  brcd: any;
  cooor: any;
  pmu: any;

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
  manufacturerRegistrationForm: FormGroup;
  @ViewChild('manufacturerRegistrationFormID') mrFormID: any;
  @ViewChild('captchaFormID') cFormID: any;
  @ViewChild(CaptchaComponent) private cc!: CaptchaComponent;
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  constructor(
    private homeService: HomeService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private _ngZone: NgZone
  ) {
    this.loading = false;
    this.districtList = [];
    this.blockList = [];
    this.isProprietorEmailIDAvailable = true;
    this.isUniqueFarmIDAvailable = true;

    this.manufacturerRegistrationForm = this.fb.group({
      enteredProprietorEmailID: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      enteredProprietorName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      enteredProprietorMobileNo: ['', [Validators.required, Validators.pattern(/^[6-9][0-9]{9}$/)]],
      selectedDistrict: ['', Validators.required],
      selectedBlock: ['', Validators.required],
      enteredProprietorAddress: ['', Validators.required],
      enteredFarmName: ['', Validators.required],
      enteredUniqueFarmID: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{3}$/)]],
      enteredGSTINNo: ['', [Validators.required, Validators.pattern(/^[0-4][0-9][a-zA-Z]{5}\d{4}[a-zA-Z][a-zA-Z\d][zZ][a-zA-Z\d]$/)]],
      enteredPANNo: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{5}\d{4}[a-zA-Z]$/)]],
      uploadedDICMSMERegistrationCertificate: ['', Validators.required],
      uploadedUdyogAadhaar: ['', Validators.required],
      uploadedBSIRegistrationCertificate: ['', Validators.required],
      uploadedOAICOSICOFMRDCRegistrationConsent: ['', Validators.required],
      uploadedManufacturingUnitPhoto: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.captchaValue = null;
    this.captchaResult = null;
    this.base64FileDMRC = '';
    this.base64FileUA = '';
    this.base64FileBRCD = '';
    this.base64FileCOOOR = '';
    this.base64FilePMU = '';
    this.dmrc = null;
    this.ua = null;
    this.brcd = null;
    this.cooor = null;
    this.pmu = null;
    this.loadDistricts();
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  get mrf() { return this.manufacturerRegistrationForm.controls; }
  get enteredProprietorEmailID() { return this.manufacturerRegistrationForm.get('enteredProprietorEmailID'); }
  get enteredProprietorName() { return this.manufacturerRegistrationForm.get('enteredProprietorName'); }
  get enteredProprietorMobileNo() { return this.manufacturerRegistrationForm.get('enteredProprietorMobileNo'); }
  get selectedDistrict() { return this.manufacturerRegistrationForm.get('selectedDistrict'); }
  get selectedBlock() { return this.manufacturerRegistrationForm.get('selectedBlock'); }
  get enteredProprietorAddress() { return this.manufacturerRegistrationForm.get('enteredProprietorAddress'); }
  get enteredFarmName() { return this.manufacturerRegistrationForm.get('enteredFarmName'); }
  get enteredUniqueFarmID() { return this.manufacturerRegistrationForm.get('enteredUniqueFarmID'); }
  get enteredGSTINNo() { return this.manufacturerRegistrationForm.get('enteredGSTINNo'); }
  get enteredPANNo() { return this.manufacturerRegistrationForm.get('enteredPANNo'); }
  get uploadedDICMSMERegistrationCertificate() { return this.manufacturerRegistrationForm.get('uploadedDICMSMERegistrationCertificate'); }
  get uploadedUdyogAadhaar() { return this.manufacturerRegistrationForm.get('uploadedUdyogAadhaar'); }
  get uploadedBSIRegistrationCertificate() { return this.manufacturerRegistrationForm.get('uploadedBSIRegistrationCertificate'); }
  get uploadedOAICOSICOFMRDCRegistrationConsent() { return this.manufacturerRegistrationForm.get('uploadedOAICOSICOFMRDCRegistrationConsent'); }
  get uploadedManufacturingUnitPhoto() { return this.manufacturerRegistrationForm.get('uploadedManufacturingUnitPhoto'); }

  // ngAfterViewInit() {
  //   this.stepper._getIndicatorType = () => STEP_STATE.NUMBER;
  // }

  loadDistricts() {
    this.homeService.getDistricts().subscribe((result: any) => {
      this.districtList = result;
    }, (error) => this.toastr.error(error.statusText, error.status));
  }

  loadBlocks() {
    if (this.selectedDistrict!.value !== null && this.selectedDistrict!.value !== undefined && this.selectedDistrict!.value !== '') {
      this.homeService.getBlocks(this.selectedDistrict!.value.DistrictCode).subscribe((result: any) => {
        this.blockList = result;
      }, (error) => this.toastr.error(error.statusText, error.status));
    }
  }

  arrayBufferToBase64(buffer: Iterable<number>) {
    return new Promise((resolve, reject) => {
      try {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        resolve(window.btoa(binary));
      } catch (e) {
        reject(new Error(`Oops! An error occurred: ${e}`));
      }
    });
  }

  base64ToArrayBuffer(base64: string) {
    return new Promise((resolve, reject) => {
      try {
        const binary_string = window.atob(base64);
        const len = binary_string.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binary_string.charCodeAt(i);
        }
        resolve(bytes.buffer);
      } catch (e) {
        reject(new Error(`Oops! An error occurred: ${e}`));
      }
    });
  }

  checkMIMEType(event: any, file: any) {
    return new Promise((resolve, reject) => {
      if (event.target.readyState === FileReader.DONE) {
        try {
          const uint = new Uint8Array(event.target.result);
          const bytes: string[] = [];
          uint.forEach((byte: any) => {
            bytes.push(byte.toString(16));
          });
          const hex = bytes.join('').toUpperCase();
          const obj = {
            fileName: file.name,
            fileType: file.type ? file.type : 'Unknown / Missing Extension',
            binaryFileType: this.getMIMEType(hex)
          };
          resolve(obj);
        } catch (e) {
          reject(new Error(`Oops! An error occurred: ${e}`));
        }
      }
    });
  }

  getMIMEType(signature: any) {
    switch (signature) {
      case '89504E47':
        return 'image/png';
      case '47494638':
        return 'image/gif';
      case 'FFD8FFDB':
      case 'FFD8FFE0':
      case 'FFD8FFE1':
      case 'FFD8FFE2':
      case 'FFD8FFE3':
      case 'FFD8FFE8':
        return 'image/jpeg';
      case '25504446':
        return 'application/pdf';
      default:
        return 'Unknown File Type';
    }
  }

  uploadDocument(e: any) {
    try {
      const file = e.target.files[0];
      if (file !== undefined && file !== null && file !== '') {
        if (e.target.nextElementSibling.id !== 'pmu') {
          if (file.type.toLowerCase() === 'application/pdf') {
            if (file.size <= 1000000) {
              const fileReader = new FileReader();
              const blob = file.slice(0, 4);
              fileReader.readAsArrayBuffer(blob);
              fileReader.onloadend = async (_event: any) => {
                const mt: any = await this.checkMIMEType(_event, file);
                if (mt.binaryFileType === 'application/pdf') {
                  const fr = new FileReader();
                  fr.readAsDataURL(file);
                  fr.onloadend = async (evt: any) => {
                    if (e.target.nextElementSibling.id === 'dmrc') {
                      this.manufacturerRegistrationForm.patchValue({
                        uploadedDICMSMERegistrationCertificate: file.name
                      });
                      this.base64FileDMRC = evt.target.result;
                      this.dmrc = e.target.files[0];
                    } else if (e.target.nextElementSibling.id === 'ua') {
                      this.manufacturerRegistrationForm.patchValue({
                        uploadedUdyogAadhaar: file.name
                      });
                      this.base64FileUA = evt.target.result;
                      this.ua = e.target.files[0];
                    } else if (e.target.nextElementSibling.id === 'brcd') {
                      this.manufacturerRegistrationForm.patchValue({
                        uploadedBSIRegistrationCertificate: file.name
                      });
                      this.base64FileBRCD = evt.target.result;
                      this.brcd = e.target.files[0];
                    } else {
                      this.manufacturerRegistrationForm.patchValue({
                        uploadedOAICOSICOFMRDCRegistrationConsent: file.name
                      });
                      this.base64FileCOOOR = evt.target.result;
                      this.cooor = e.target.files[0];
                    }
                  };
                } else {
                  this.removeFile(e.target.nextElementSibling.id);
                  this.toastr.warning(`The PDF file is tampered with. Please upload a valid PDF file.`);
                }
              };
            } else {
              this.removeFile(e.target.nextElementSibling.id);
              this.toastr.warning(`Please upload a PDF file with size less than or equal to <b>1 MB</b>.`);
            }
          } else {
            this.removeFile(e.target.nextElementSibling.id);
            this.toastr.warning(`Please upload a PDF file.`);
          }
        } else if (file.type.toLowerCase() === 'image/jpeg' || file.type.toLowerCase() === 'image/jpg' || file.type.toLowerCase() === 'image/png') {
          if (file.size <= 1000000) {
            const fileReader = new FileReader();
            const blob = file.slice(0, 4);
            fileReader.readAsArrayBuffer(blob);
            fileReader.onloadend = async (_event: any) => {
              const mt: any = await this.checkMIMEType(_event, file);
              if (mt.binaryFileType === 'image/jpeg' || mt.binaryFileType === 'image/png') {
                const fr = new FileReader();
                fr.readAsDataURL(file);
                fr.onloadend = async (evt: any) => {
                  this.manufacturerRegistrationForm.patchValue({
                    uploadedManufacturingUnitPhoto: file.name
                  });
                  this.base64FilePMU = evt.target.result;
                  this.pmu = e.target.files[0];
                };
              } else {
                this.removeFile(e.target.nextElementSibling.id);
                this.toastr.warning(`The Image file is tampered with. Please upload a valid Image file.`);
              }
            };
          } else {
            this.removeFile(e.target.nextElementSibling.id);
            this.toastr.warning(`Please upload an Image file with size less than or equal to <b>1 MB</b>.`);
          }
        } else {
          this.removeFile(e.target.nextElementSibling.id);
          this.toastr.warning(`Please upload an Image file.`);
        }
      } else {
        this.removeFile(e.target.nextElementSibling.id);
        this.toastr.warning(`Please upload a file.`);
      }
    } catch (error) {
      this.removeFile(e.target.nextElementSibling.id);
      this.toastr.warning('No file was selected.');
    }
  }

  removeFile(e: any) {
    if (e === 'dmrc') {
      this.manufacturerRegistrationForm.patchValue({
        uploadedDICMSMERegistrationCertificate: ''
      });
      this.base64FileDMRC = '';
      this.dmrc = null;
    } else if (e === 'ua') {
      this.manufacturerRegistrationForm.patchValue({
        uploadedUdyogAadhaar: ''
      });
      this.base64FileUA = '';
      this.ua = null;
    } else if (e === 'brcd') {
      this.manufacturerRegistrationForm.patchValue({
        uploadedBSIRegistrationCertificate: ''
      });
      this.base64FileBRCD = '';
      this.brcd = null;
    } else if (e === 'cooor') {
      this.manufacturerRegistrationForm.patchValue({
        uploadedOAICOSICOFMRDCRegistrationConsent: ''
      });
      this.base64FileCOOOR = '';
      this.cooor = null;
    } else {
      this.manufacturerRegistrationForm.patchValue({
        uploadedManufacturingUnitPhoto: ''
      });
      this.base64FilePMU = '';
      this.pmu = null;
    }
  }

  keyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onSubmit();
    }
  }

  checkProprietorEmailIDAvailability() {
    if (this.enteredProprietorEmailID!.value !== null && this.enteredProprietorEmailID!.value !== undefined && this.enteredProprietorEmailID!.value !== '' && this.enteredProprietorEmailID!.valid) {
      this.homeService.checkProprietorEmailIDAvailability(this.enteredProprietorEmailID!.value.trim().replace(/\s+/g, '').toLowerCase()).subscribe((result: any) => {
        if (result.length === 0) {
          this.isProprietorEmailIDAvailable = true;
        } else {
          this.isProprietorEmailIDAvailable = false;
          this.toastr.error(`The Proprietor's Email ID: "<b>${this.enteredProprietorEmailID!.value.trim().replace(/\s+/g, '').toLowerCase()}</b>" is already taken. Please enter a different one.`);
          this.manufacturerRegistrationForm.patchValue({
            enteredProprietorEmailID: ''
          });
        }
      }, (error) => this.toastr.error(error.statusText, error.status));
    }
  }

  checkUniqueFarmIDAvailability() {
    if (this.enteredUniqueFarmID!.value !== null && this.enteredUniqueFarmID!.value !== undefined && this.enteredUniqueFarmID!.value !== '' && this.enteredUniqueFarmID!.valid) {
      this.homeService.checkUniqueFarmIDAvailability(this.enteredUniqueFarmID!.value.toUpperCase()).subscribe((result: any) => {
        if (result.length === 0) {
          this.isUniqueFarmIDAvailable = true;
        } else {
          this.isUniqueFarmIDAvailable = false;
          this.toastr.error(`The Unique Farm ID: "<b>${this.enteredUniqueFarmID!.value.toUpperCase()}</b>" is already taken. Please enter a different one.`);
          this.manufacturerRegistrationForm.patchValue({
            enteredUniqueFarmID: ''
          });
        }
      }, (error) => this.toastr.error(error.statusText, error.status));
    }
  }

  onSubmit() {
    if (this.manufacturerRegistrationForm.valid && this.isProprietorEmailIDAvailable && this.isUniqueFarmIDAvailable) {
      if (this.captchaValue !== null && this.captchaValue !== undefined && this.captchaValue !== '') {
        const cv = parseInt(this.captchaValue, 10);
        if (cv === this.captchaResult) {
          const data = {
            ManufacturerEmailID: this.enteredProprietorEmailID!.value.trim().replace(/\s+/g, '').toLowerCase(),
            ManufacturerName: this.enteredProprietorName!.value.toLowerCase().split(' ').map((x: string) => x.charAt(0).toUpperCase() + x.slice(1)).join(' '),
            ManufacturerMobileNo: this.enteredProprietorMobileNo!.value,
            DistrictCode: this.selectedDistrict!.value.DistrictCode,
            BlockCode: this.selectedBlock!.value.BlockCode,
            ManufacturerAddress: this.enteredProprietorAddress!.value.toLowerCase().split(' ').map((x: string) => x.charAt(0).toUpperCase() + x.slice(1)).join(' '),
            FarmName: this.enteredFarmName!.value.toLowerCase().split(' ').map((x: string) => x.charAt(0).toUpperCase() + x.slice(1)).join(' '),
            UniqueFarmID: this.enteredUniqueFarmID!.value.toUpperCase(),
            GSTINNo: this.enteredGSTINNo!.value.toUpperCase(),
            PANNo: this.enteredPANNo!.value.toUpperCase(),
            Captcha: cv
          };
          const formData = new FormData();
          formData.append('data', JSON.stringify(data));
          formData.append('DICMSMERegistrationCertificate', this.dmrc);
          formData.append('UdyogAadhaar', this.ua);
          formData.append('BSIRegistrationCertificate', this.brcd);
          formData.append('OAICOSICOFMRDCRegistrationConsent', this.cooor);
          formData.append('ManufacturingUnitPhoto', this.pmu);
          this.homeService.submitManufacturerDetails(formData).subscribe((result: any) => {
            if (!('message' in result)) {
              if (result.length === 1) {
                if (result[0].Error === 'Duplicate Manufacturer Email ID is found. Please register with a different Manufacturer Email ID.') {
                  this.toastr.error(result[0].Error);
                  this.cFormID.captchaForm.reset();
                  this.cc.generateCaptchaAndSalt();
                  this.manufacturerRegistrationForm.patchValue({
                    enteredProprietorEmailID: ''
                  });
                } else if (result[0].Error === 'Duplicate Unique Farm ID is found. Please register with a different Unique Farm ID.') {
                  this.toastr.error(result[0].Error);
                  this.cFormID.captchaForm.reset();
                  this.cc.generateCaptchaAndSalt();
                  this.manufacturerRegistrationForm.patchValue({
                    enteredUniqueFarmID: ''
                  });
                } else {
                  this.toastr.success(`The Registration is done successfully. The user credentials will be sent via SMS once the registration is approved.`);
                  setTimeout(() => {
                    this.cFormID.captchaForm.reset();
                    this.cc.generateCaptchaAndSalt();
                    this.manufacturerRegistrationForm.reset();
                    this.manufacturerRegistrationForm.patchValue({
                      enteredProprietorEmailID: '',
                      enteredProprietorName: '',
                      enteredProprietorMobileNo: '',
                      selectedDistrict: '',
                      selectedBlock: '',
                      enteredProprietorAddress: '',
                      enteredFarmName: '',
                      enteredUniqueFarmID: '',
                      enteredGSTINNo: '',
                      enteredPANNo: '',
                      uploadedDICMSMERegistrationCertificate: '',
                      uploadedUdyogAadhaar: '',
                      uploadedBSIRegistrationCertificate: '',
                      uploadedOAICOSICOFMRDCRegistrationConsent: '',
                      uploadedManufacturingUnitPhoto: ''
                    });
                    this.base64FileDMRC = '';
                    this.dmrc = null;
                    this.base64FileUA = '';
                    this.ua = null;
                    this.base64FileBRCD = '';
                    this.brcd = null;
                    this.base64FileCOOOR = '';
                    this.cooor = null;
                    this.base64FilePMU = '';
                    this.pmu = null;
                    this.manufacturerRegistrationForm.markAsPristine();
                    this.cFormID.captchaForm.markAsPristine();
                  }, 1);
                }
              } else {
                this.toastr.error(`Oops! An error has occurred. Please try again after sometime.`);
                this.cFormID.captchaForm.reset();
                this.cc.generateCaptchaAndSalt();
              }
            } else {
              this.toastr.error(`Please enter the correct <b>Captcha</b> value to complete the booking process.`);
              this.cFormID.captchaForm.reset();
              this.cc.generateCaptchaAndSalt();
            }
          }, (error) => this.toastr.error(error.statusText, error.status));
        } else {
          this.toastr.error(`Please enter the correct <b>Captcha</b> value to complete the booking process.`);
          this.cFormID.captchaForm.reset();
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