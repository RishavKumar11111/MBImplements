import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
// import { RxwebValidators, RxFormBuilder } from '@rxweb/reactive-form-validators';
import { sha512 } from 'js-sha512';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { CaptchaComponent } from '../captcha/captcha.component';
// import { NgxCaptchaService } from '@binssoft/ngx-captcha';
import { AuthService } from '../../services/auth.service';
import { Login } from '../../models/auth/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // captchaStatus: any = '';
  salt: string;
  captchaValue: any;
  captchaResult: any;
  loading: boolean;
  error: string;

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

  @Input() loginForm: FormGroup;
  @ViewChild('loginFormID') lFormID: any;
  @ViewChild('captchaFormID') cFormID: any;
  @ViewChild(CaptchaComponent) private cc!: CaptchaComponent;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router
    // private captchaService: NgxCaptchaService
  ) {
    // this.captchaService.captchStatus.subscribe((status) => {
    //   this.captchaStatus = status;
    //   if (status === false) {
    //     alert('Opps!\nCaptcha mismatch');
    //   } else if (status === true) {
    //     alert('Success!\nYou are right');
    //   }
    // });

    this.salt = '';
    this.loading = false;
    this.error = '';

    this.loginForm = this.fb.group({
      userID: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern(/^([\w]+|(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[#?!@$%^&*.-]).{8,50}$/)]]
    });
  }

  ngOnInit(): void {
    this.captchaValue = null;
    this.captchaResult = null;

    $(() => {
      $('.wrap-input100 .input100').on('focusout', function success() {
        if ($(this).val() !== '') {
          $(this).addClass('has-content');
        } else {
          $(this).removeClass('has-content');
        }
      });
    });

    setTimeout(() => {
      document.addEventListener('onautocomplete', (e: any) => {
        e.target.hasAttribute('autocompleted'); // true or false
        // e.preventDefault(); // prevent autocomplete
        $('.wrap-input100 .input100').addClass('has-content');
      });
    }, 1);
  }

  ngAfterViewInit() { }

  get f() { return this.loginForm.controls; }
  get userID() { return this.loginForm.get('userID'); }
  get password() { return this.loginForm.get('password'); }

  showPassword() {
    const x = (<HTMLInputElement>document.getElementById('password'));
    if (x.type === 'password') {
      x.type = 'text';
    } else {
      x.type = 'password';
    }
  }

  keyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.signIn();
    }
  }

  signIn() {
    if (this.loginForm.valid && this.captchaValue !== null && this.captchaValue !== undefined && this.captchaValue !== '') {
      const cv = parseInt(this.captchaValue, 10);
      if (cv === this.captchaResult) {
        this.loginForm.patchValue({
          password: sha512(sha512(this.password!.value) + this.salt)
        });
        this.password!.setErrors(null);
        const data = {
          userID: this.userID!.value,
          password: this.password!.value,
          captcha: cv
        };
        this.loading = true;
        this.authService.signIn(data).subscribe((result: any) => {
          this.loading = false;
          if (result.message === true) {
            this.authService.setRole(result.role);
            this.authService.setUsername(result.username);
            switch (result.role) {
              case 'AAE': {
                this.router.navigate(['aae']);
                break;
              }
              case 'Admin': {
                this.router.navigate(['admin']);
                break;
              }
              case 'AEE': {
                this.router.navigate(['aee']);
                break;
              }
              case 'AO': {
                this.router.navigate(['ao']);
                break;
              }
              case 'EE': {
                this.router.navigate(['ee']);
                break;
              }
              case 'Manufacturer': {
                this.router.navigate(['manufacturer']);
                break;
              }
              case 'OAIC': {
                this.router.navigate(['oaic']);
                break;
              }
              case 'OFMRDC': {
                this.router.navigate(['ofmrdc']);
                break;
              }
              case 'OSIC': {
                this.router.navigate(['osic']);
                break;
              }
              case 'SE': {
                this.router.navigate(['se']);
                break;
              }
              case 'SuperAdmin': {
                this.router.navigate(['superAdmin']);
                break;
              }
              default: {
                this.router.navigate(['']);
              }
            }
          } else {
            this.loading = false;
            this.error = result.message;
            this.lFormID.nativeElement[0].focus();
            this.loginForm.reset();
            this.cFormID.captchaForm.reset();
          }
        }, (error) => this.toastr.error(error.statusText, error.status));
      } else {
        this.toastr.warning(`Please enter the correct <b>Captcha</b> value to proceed with login.`);
        this.lFormID.nativeElement[0].focus();
        this.loginForm.reset();
        this.cFormID.captchaForm.reset();
        this.cc.generateCaptchaAndSalt();
      }
    } else {
      this.toastr.warning(`Please enter the <b>User ID</b>, <b>Password</b> and <b>Captcha</b> to proceed with login.`);
      this.lFormID.nativeElement[0].focus();
      this.loginForm.reset();
      this.cFormID.captchaForm.reset();
      this.cc.generateCaptchaAndSalt();
    }
  }

  enteredCaptcha(e: any) {
    this.captchaValue = e.captchaInput.value;
    this.captchaResult = e.captchaResult;
  }

  generatedSalt(e: any) {
    this.salt = e;
  }
}