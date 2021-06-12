import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { NgxCaptchaModule } from '@binssoft/ngx-captcha';

import { AuthRoutingModule } from './auth-routing.module';

import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login/login.component';
import { CaptchaComponent } from './captcha/captcha.component';

@NgModule({
  declarations: [
    LoginComponent,
    CaptchaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // NgxCaptchaModule,
    AuthRoutingModule,
    SharedModule
  ],
  exports: [CaptchaComponent]
})
export class AuthModule {
  // static forRoot(): ModuleWithProviders<AuthModule> {
  //   return {
  //     ngModule: AppModule,
  //     providers: [AuthService]
  //   };
  // }
}