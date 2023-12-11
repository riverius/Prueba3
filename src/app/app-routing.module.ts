import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './../app/guards/auth.guard';

const routes: Routes = [

  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    data: { roles: ['teacher'] },
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'recovery',
    loadChildren: () => import('./pages/recovery/recovery.module').then( m => m.RecoveryPageModule)
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    data: { roles: ['teacher'] },
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },  

  {
    path: 'curso',
    canActivate: [AuthGuard],
    data: { roles: ['teacher'] },
    loadChildren: () => import('./pages/curso/curso.module').then( m => m.CursoPageModule)
  },
  {
    path: 'qrscanner',
    canActivate: [AuthGuard],
    data: { roles: ['student'] },
    loadChildren: () => import('./pages/qrscanner/qrscanner.module').then( m => m.QrscannerPageModule)
  },
  {
    path: 'attendance',
    canActivate: [AuthGuard],
    data: { roles: ['teacher'] },
    loadChildren: () => import('./pages/attendance/attendance.module').then( m => m.AttendancePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    data: { roles: ['admin'] },
    loadChildren: () => import('./pages/admin/admin.module').then( m => m.AdminPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
