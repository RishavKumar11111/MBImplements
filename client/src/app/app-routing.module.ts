import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((module) => module.AuthModule)
  },
  {
    path: 'aae',
    data: {
      role: 'AAE'
    },
    canActivate: [AuthGuard],
    component: LayoutComponent,
    loadChildren: () => import('./aae/aae.module').then((module) => module.AaeModule)
  },
  {
    path: 'admin',
    data: {
      role: 'Admin'
    },
    canActivate: [AuthGuard],
    component: LayoutComponent,
    loadChildren: () => import('./admin/admin.module').then((module) => module.AdminModule)
  },
  {
    path: 'aee',
    data: {
      role: 'AEE'
    },
    canActivate: [AuthGuard],
    component: LayoutComponent,
    loadChildren: () => import('./aee/aee.module').then((module) => module.AeeModule)
  },
  {
    path: 'ao',
    data: {
      role: 'AO'
    },
    canActivate: [AuthGuard],
    component: LayoutComponent,
    loadChildren: () => import('./ao/ao.module').then((module) => module.AoModule)
  },
  {
    path: 'ee',
    data: {
      role: 'EE'
    },
    canActivate: [AuthGuard],
    component: LayoutComponent,
    loadChildren: () => import('./ee/ee.module').then((module) => module.EeModule)
  },
  {
    path: 'manufacturer',
    data: {
      role: 'Manufacturer'
    },
    canActivate: [AuthGuard],
    component: LayoutComponent,
    loadChildren: () => import('./manufacturer/manufacturer.module').then((module) => module.ManufacturerModule)
  },
  {
    path: 'oaic',
    data: {
      role: 'OAIC'
    },
    canActivate: [AuthGuard],
    component: LayoutComponent,
    loadChildren: () => import('./oaic/oaic.module').then((module) => module.OaicModule)
  },
  {
    path: 'ofmrdc',
    data: {
      role: 'OFMRDC'
    },
    canActivate: [AuthGuard],
    component: LayoutComponent,
    loadChildren: () => import('./ofmrdc/ofmrdc.module').then((module) => module.OfmrdcModule)
  },
  {
    path: 'osic',
    data: {
      role: 'OSIC'
    },
    canActivate: [AuthGuard],
    component: LayoutComponent,
    loadChildren: () => import('./osic/osic.module').then((module) => module.OsicModule)
  },
  {
    path: 'se',
    data: {
      role: 'SE'
    },
    canActivate: [AuthGuard],
    component: LayoutComponent,
    loadChildren: () => import('./se/se.module').then((module) => module.SeModule)
  },
  {
    path: 'superAdmin',
    data: {
      role: 'SuperAdmin'
    },
    canActivate: [AuthGuard],
    component: LayoutComponent,
    loadChildren: () => import('./super-admin/super-admin.module').then((module) => module.SuperAdminModule)
  },
  {
    path: 'vaccine',
    loadChildren: () => import('./vaccine/vaccine.module').then((module) => module.VaccineModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }