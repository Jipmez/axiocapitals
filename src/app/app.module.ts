import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { ToastrModule } from 'ng6-toastr-notifications';

import { NgxSpinnerModule } from 'ngx-spinner';

import { AngularWebStorageModule } from 'angular-web-storage';
import { DashboardComponent } from './layout/user/dashboard/dashboard.component';
import { DashcontentComponent } from './layout/user/dashcontent/dashcontent.component';
import { DashcontentserviceService } from './layout/user/dashcontent/dashcontentservice.service';

import { DashboardserviceService } from './layout/user/dashboard/dashboardservice.service';
import { DepositComponent } from './layout/user/deposit/deposit.component';
import { WithdrawalComponent } from './layout/user/withdrawal/withdrawal.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './layout/user/profile/profile.component';
import { CaptureComponent } from './layout/user/capture/capture.component';
import { HistoryComponent } from './layout/user/history/history.component';
import { SharedModule } from './layout/shared/shared.module';





@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DashcontentComponent,
    DepositComponent,
    WithdrawalComponent,
    ProfileComponent,
    CaptureComponent,
    HistoryComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    CommonModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    AngularWebStorageModule,
    FormsModule,
    SharedModule,
  ],
  providers: [
    CookieService,
    DashcontentserviceService,
    DashboardserviceService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
