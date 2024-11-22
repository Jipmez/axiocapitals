import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ng6-toastr-notifications';
import { FormsModule } from '@angular/forms';
import { AngularWebStorageModule } from 'angular-web-storage';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { RegisterComponent } from '../start/register/register.component';
import { LoginComponent } from '../start/login/login.component';
import { StartRoutingModule } from './start-routing.module';
import { VerifyComponent } from './verify/verify.component';
import { ForgotpassComponent } from './forgotpass/forgotpass.component';
import { ResetComponent } from './reset/reset.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { FaqComponent } from './faq/faq.component';
import { PromoComponent } from './promo/promo.component';
import { StartingComponent } from './starting/starting.component';
import { CitizenComponent } from './citizen/citizen.component';
import { OnboardComponent } from './onboard/onboard.component';

@NgModule({
  declarations: [
    VerifyComponent,
    ForgotpassComponent,
    ResetComponent,
    LoginComponent,
    RegisterComponent,
    NavComponent,
    HomeComponent,
    ContactComponent,
    FaqComponent,
    PromoComponent,
    StartingComponent,
    CitizenComponent,
    OnboardComponent,
  ],
  imports: [
    CommonModule,
    StartRoutingModule,
    NgxSpinnerModule,

    CarouselModule,
    CommonModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    AngularWebStorageModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [StartModule],
})
export class StartModule {}
