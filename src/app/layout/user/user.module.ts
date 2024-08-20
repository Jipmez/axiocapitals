import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ng6-toastr-notifications';
import { FormsModule } from '@angular/forms';

import { AngularWebStorageModule } from 'angular-web-storage';
import { DashboardComponent } from '../user/dashboard/dashboard.component';
import { DashcontentComponent } from '../user/dashcontent/dashcontent.component';
import { DashcontentserviceService } from '../user/dashcontent/dashcontentservice.service';
import { DashboardserviceService } from '../user/dashboard/dashboardservice.service';
import { DepositComponent } from '../user/deposit/deposit.component';
import { WithdrawalComponent } from '../user/withdrawal/withdrawal.component';
import { ProfileComponent } from '../user/profile/profile.component';
import { UserRoutingModule } from './user-routing.module';
import { HistoryComponent } from './history/history.component';
import { CaptureComponent } from './capture/capture.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DashcontentComponent,
    DepositComponent,
    WithdrawalComponent,
    ProfileComponent,
    HistoryComponent,
    CaptureComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    AngularWebStorageModule,
    FormsModule,
  ],
  providers: [DashcontentserviceService, DashboardserviceService],
})
export class UserModule {}
