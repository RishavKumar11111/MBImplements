import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { SharedModule } from '../shared/shared.module';

import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { HomeHeaderComponent } from './home-layout/home-header/home-header.component';
import { HomeFooterComponent } from './home-layout/home-footer/home-footer.component';

@NgModule({
  declarations: [
    HomeLayoutComponent,
    HomeHeaderComponent,
    HomeFooterComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }