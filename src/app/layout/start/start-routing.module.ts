import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from '../start/register/register.component';
import { LoginComponent } from '../start/login/login.component';

import { VerifyComponent } from './verify/verify.component';
import { ForgotpassComponent } from './forgotpass/forgotpass.component';
import { ResetComponent } from './reset/reset.component';

import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';

import { ContactComponent } from '../start/contact/contact.component';
import { FaqComponent } from './faq/faq.component';
import { StartingComponent } from './starting/starting.component';

import { PromoComponent } from './promo/promo.component';
import { CitizenComponent } from './citizen/citizen.component';

const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: FaqComponent },
      { path: 'citizenship', component: CitizenComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'terms', component: StartingComponent },
      { path: 'promo', component: PromoComponent },
      { path: 'signup', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'forgot_pass', component: ForgotpassComponent },
    ],
  },

  { path: 'verify', component: VerifyComponent },

  { path: 'reset_pass', component: ResetComponent },

  /*  {
    path: "**",
    component: HomeComponent
  } */
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartRoutingModule {}
