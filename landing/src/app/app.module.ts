import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';

// import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';

import { AppRoutingModule } from './app-routing.module';

import { HomeModule } from './home/home.module';

// import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 10000,
      extendedTimeOut: 10000,
      enableHtml: true,
      progressBar: true
    }),
    BackButtonDisableModule.forRoot({
      preserveScrollPosition: true
    }),
    // RxReactiveFormsModule,
    AppRoutingModule,
    HomeModule
  ],
  providers: [
    // CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }