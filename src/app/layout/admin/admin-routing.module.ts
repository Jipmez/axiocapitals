import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AdmindashComponent } from "./admindash/admindash.component";
import { ContentComponent } from "./content/content.component";
import { ContentService } from "./content/content.service";
import { ProfileComponent } from "./profile/profile.component";
import { DepositComponent } from "./deposit/deposit.component";
import { WithdrawalComponent } from "./withdrawal/withdrawal.component";
import { DepositService } from "./deposit/deposit.service";
import { MailService } from "./mail/mail.service";
import { WithdrawalService } from "./withdrawal/withdrawal.service";
import { AdcontentComponent } from "./adcontent/adcontent.component";
import { MailComponent } from "./mail/mail.component";
const routes: Routes = [
  // { path: "dashboard", redirectTo: "morr", pathMatch: "full" },

  {
    path: "",
    component: AdmindashComponent,
    children: [
      {
        path: "",
        component: ContentComponent,
        resolve: {
          content: ContentService,
        },
      },
      {
        path: "content",
        component: ContentComponent,
        resolve: {
          content: ContentService,
        },
      },
      { path: "proid/:id", component: ProfileComponent },
      {
        path: "deposit",
        component: DepositComponent,
        resolve: {
          depconfirm: DepositService,
        },
      },
      {
        path: "withdraw",
        component: WithdrawalComponent,
        resolve: {
          withconfirm: WithdrawalService,
        },
      },
      {
        path: "adcontent",
        component: AdcontentComponent,
      },
      {
        path: "mailing",
        component: MailComponent,
        resolve: {
          mail: MailService,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
