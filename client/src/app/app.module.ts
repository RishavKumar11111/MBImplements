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

import { AaeModule } from './aae/aae.module';
import { AdminModule } from './admin/admin.module';
import { AeeModule } from './aee/aee.module';
import { AoModule } from './ao/ao.module';
import { AuthModule } from './auth/auth.module';
import { EeModule } from './ee/ee.module';
import { ManufacturerModule } from './manufacturer/manufacturer.module';
import { OaicModule } from './oaic/oaic.module';
import { OfmrdcModule } from './ofmrdc/ofmrdc.module';
import { OsicModule } from './osic/osic.module';
import { SeModule } from './se/se.module';
import { SuperAdminModule } from './super-admin/super-admin.module';
import { VaccineModule } from './vaccine/vaccine.module';

// import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { TitleComponent } from './layout/title/title.component';
import { LeftSidebarComponent } from './layout/left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from './layout/right-sidebar/right-sidebar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ThemeSettingComponent } from './layout/theme-setting/theme-setting.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    TitleComponent,
    LeftSidebarComponent,
    RightSidebarComponent,
    FooterComponent,
    ThemeSettingComponent
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
    AaeModule,
    AdminModule,
    AeeModule,
    AoModule,
    AuthModule,
    EeModule,
    ManufacturerModule,
    OaicModule,
    OfmrdcModule,
    OsicModule,
    SeModule,
    SuperAdminModule,
    VaccineModule
  ],
  providers: [
    // CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }