import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})
export class CaptchaComponent implements OnChanges {
  constructor(
    private service: AuthService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) { }

  @Input('config') config: any = {
  };

  @Output() enteredCaptcha: EventEmitter<any> = new EventEmitter<any>();
  @Output() generatedSalt: EventEmitter<any> = new EventEmitter<any>();
  @Input() captchaForm: any;
  @ViewChild('captchaFormID') cFormID: any;

  captchaSaltResult: any;

  ngOnInit(): void {
    this.captchaSaltResult = null;

    this.captchaForm = this.fb.group({
      captchaInput: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3), Validators.pattern(/^[\d]+$/)]]
    });
  }

  get f() { return this.captchaForm.controls; }
  get captchaInput() { return this.captchaForm.get('captchaInput'); }

  ngOnChanges() {
    if (this.config) {
      if (!this.config.font || !this.config.font.size) {
        this.config.font.size = '84px';
      }
      if (!this.config.font || !this.config.font.family) {
        this.config.font.family = 'Arial';
      }
      if (!this.config.strokeColor) {
        this.config.strokeColor = '#f20c6c';
      }
      if (!this.config.length) {
        this.config.length = 6;
      }
      if (!this.config.cssClass) {
        this.config.cssClass = '';
      }
      if (!this.config.type) {
        this.config.type = 2;
      }
      if (!this.config.back || !this.config.back.stroke) {
        this.config.back.stroke = '';
      }
      if (!this.config.back || !this.config.back.solid) {
        this.config.back.solid = '#f2efd2';
      }
      this.generateCaptchaAndSalt();
    }
  }

  generateCaptchaAndSalt() {
    this.service.generateCaptchaAndSalt(this.config.type, this.config.length).subscribe((result: any) => {
      this.captchaSaltResult = result;
      this.generatedSalt.emit(this.captchaSaltResult.salt);
      const captchaCanvas: any = document.getElementById('captchaCanvas');
      const ctx = captchaCanvas.getContext('2d');
      ctx.fillStyle = this.config.back.solid;
      ctx.fillRect(0, 0, captchaCanvas.width, captchaCanvas.height);
      ctx.beginPath();
      captchaCanvas.style.letterSpacing = `${1}px`;
      captchaCanvas.style.width = `${50}%`;
      captchaCanvas.style.height = `${7}vh`;
      ctx.font = `${this.config.font.size} ${this.config.font.family}`;
      ctx.fillStyle = this.config.font.color;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.fillText(this.captchaSaltResult.code, 150, 85);
      if (this.config.back.stroke) {
        ctx.strokeStyle = this.config.back.stroke;
        for (let i = 0; i < 150; i++) {
          ctx.moveTo(Math.random() * 300, Math.random() * 300);
          ctx.lineTo(Math.random() * 300, Math.random() * 300);
        }
        ctx.stroke();
      }
      ctx.closePath();
    }, (error) => this.toastr.error(error.statusText, error.status));
  }

  playCaptcha() {
    const msg = new SpeechSynthesisUtterance(this.captchaSaltResult.code);
    msg.lang = 'en-IN';
    msg.pitch = 1;
    msg.rate = 1;
    msg.volume = 1;
    msg.text = msg.text.indexOf('-') ? msg.text.replace('-', '--') : msg.text;
    window.speechSynthesis.speak(msg);
  }

  getEnteredCaptchaValue() {
    this.enteredCaptcha.emit({
      captchaInput: this.captchaInput, captchaResult: this.captchaSaltResult.resultCode
    });
  }

  keyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.getEnteredCaptchaValue();
    }
  }

  // checkCaptcha() {
  //   if (this.captchaInput != this.captchaResult.resultCode) {
  //     this.service.setCaptchaStatus(false);
  //   } else {
  //     this.service.setCaptchaStatus(true);
  //   }
  // };
}