import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [

  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'dashboard',
    canActivate: [LoginGuard],
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'recovery',
    loadChildren: () => import('./pages/recovery/recovery.module').then( m => m.RecoveryPageModule)
  },
  {
    path: 'home',
    canActivate: [LoginGuard],
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },  

  {
    path: 'curso',
    canActivate: [LoginGuard],
    loadChildren: () => import('./pages/curso/curso.module').then( m => m.CursoPageModule)
  },
  {
    path: 'qrscanner',
    canActivate: [LoginGuard],
    loadChildren: () => import('./pages/qrscanner/qrscanner.module').then( m => m.QrscannerPageModule)
  },
  {
    path: 'attendance',
    canActivate: [LoginGuard],
    loadChildren: () => import('./pages/attendance/attendance.module').then( m => m.AttendancePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
