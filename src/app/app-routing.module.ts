import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashcontentComponent } from './layout/user/dashcontent/dashcontent.component';
import { DashcontentserviceService } from './layout/user/dashcontent/dashcontentservice.service';

import { DashboardserviceService } from './layout/user/dashboard/dashboardservice.service';
import { DepositComponent } from './layout/user/deposit/deposit.component';
import { WithdrawalComponent } from './layout/user/withdrawal/withdrawal.component';

import { ProfileComponent } from './layout/user/profile/profile.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './layout/user/dashboard/dashboard.component';
import { CaptureComponent } from './layout/user/capture/capture.component';
import { HistoryComponent } from './layout/user/history/history.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./layout/start/start.module').then((m) => m.StartModule),
  },
  {
    path: 'hkgjiinif684080ngi98084g06',
    loadChildren: () =>
      import('./layout/admin/admin.module').then((m) => m.AdminModule),
  },

  /*  {
    path: 'dashboard',
    loadChildren: () =>
      import('./layout/user/user.module').then((m) => m.UserModule),
  }, */

  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: DashcontentComponent,
        resolve: {
          news: DashcontentserviceService,
        },
      },
      {
        path: 'dashcontent',
        component: DashcontentComponent,
        resolve: {
          news: DashcontentserviceService,
        },
      },
      {
        path: 'deposit',
        component: DepositComponent,
        resolve: {
          news: DashboardserviceService,
        },
      },
      {
        path: 'capture',
        component: CaptureComponent,
      },
      {
        path: 'history',
        component: HistoryComponent,
      },
      {
        path: 'withdrawal',
        component: WithdrawalComponent,
        resolve: {
          news: DashcontentserviceService,
        },
      },

      {
        path: 'profile',
        component: ProfileComponent,
        resolve: {
          news: DashcontentserviceService,
        },
      },
    ],
    resolve: {
      news: DashboardserviceService,
    },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes /* , { useHash: true } */)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
