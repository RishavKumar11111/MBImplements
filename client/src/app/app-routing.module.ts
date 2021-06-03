import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((module) => module.AuthModule)
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
    path: 'ee',
    data: {
      role: 'EE'
    },
    canActivate: [AuthGuard],
    component: LayoutComponent,
    loadChildren: () => import('./ee/ee.module').then((module) => module.EeModule)
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