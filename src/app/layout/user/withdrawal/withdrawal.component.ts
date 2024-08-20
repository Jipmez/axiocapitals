import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NgForm } from '@angular/forms';
import { DataService } from '../../../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStorageService } from 'angular-web-storage';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';

declare let $;
@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.scss'],
})
export class WithdrawalComponent implements OnInit {
  pwith: any;
  bitad: any;
  val: number;
  country: any;
  bank: any;
  amb: any;
  trust: any;
  withlimit: any;
  ether: any;
  usdt: any;
  usdterc: any;
  display = 0;
  usdttrc: any;
  upi: any;
  upis: any;
  upname: any;
  trust_access: any;

  constructor(
    private server: DataService,
    private cookieService: CookieService,
    private route: Router,
    private activate: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private toastr: ToastrManager,
    public session: SessionStorageService
  ) {
    if ($('.sidebar-enable')[0]) {
      $('#tog').click();
    }

    $('.app-wrap').removeClass('sidebar-toggled');
  }

  cookieValue = this.cookieService.get('logID');
  acc;

  /*  showSuccess() {
    this.toastr.success('You are awesome!', 'Success!');
  } */

  ngOnInit() {
    $('.pc-sidebar ').removeClass('mob-sidebar-active');
    $('.lay ').removeClass('pc-menu-overlay');
    this.cookieValue = this.session.get('sessionID');
    let data = this.activate.snapshot.data;
    this.acc = data['news'].dep['message'][0]['mainaccountbal'];

    this.amb = data['news'].dep['message'][0]['ambassador'];
    this.trust = data['news'].dep['message'][0]['trust_fund'];
    this.bitad = data['news'].dep['message'][0]['bitcoinaddress'];
    this.country = data['news'].dep['message'][0]['country'];
    this.bank = data['news'].dep['message'][0]['bank'];
    this.pwith = data['news'].dep['pwith'];
    this.withlimit =
      data['news'].dep['message'][0]['with_limit'] == '0'
        ? 1
        : data['news'].dep['message'][0]['with_limit'];

    this.ether = data['news'].dep['message'][0]['etheraddress'];
    this.usdt = data['news'].dep['message'][0]['usdtaddress'];
    this.usdterc = data['news'].dep['message'][0]['usdtercaddress'];
    this.usdttrc = data['news'].dep['message'][0]['usdttrcaddress'];
    this.upi = data['news'].dep['message'][0]['upiaddress'];
    this.trust_access = data['news'].dep['message'][0]['trust_access'];
    console.log(this.trust_access);
    this.upname = data['news'].dep['message'][0]['upname'];
    this.upis = data['news'].upi['message'][0]['status'];
    console.log(this.upname);
  }

  withdraw(x: NgForm) {
    let amount = parseInt(x.value.withdraw);
    if (amount >= this.withlimit) {
      if (x.value.withdrawto == 'Bank') {
        if (this.bank == 'Not set' || this.bank == '' || this.bank == null) {
          this.toastr.infoToastr('Update your Bank address');
        } else {
          if (amount <= this.acc) {
            let me = {
              withdraw: amount,
              withdrawto: x.value.withdrawto,
              val: this.cookieValue,
              key: 'withdraw',
            };
            this.server.Api(me).subscribe(
              (res) => {
                if (res['code'] == 1) {
                  this.toastr.successToastr(res['message'], 'Security Center');

                  this.route.navigate(['/dashboard/dashcontent']);
                }
                if (res['code'] == 2) {
                  this.toastr.warningToastr(res['message'], 'Security Center');
                } else {
                  this.toastr.infoToastr(res['message']);
                }
              },
              () => {},
              () => {}
            );
          } else {
            this.toastr.infoToastr('You cant withdraw more than you balance');
          }
        }
      }

      if (x.value.withdrawto != 'Bank') {
        if (
          x.value.withdrawto == 'Bitcoin' &&
          (this.bitad == 'Not set' || this.bitad == '' || this.bitad == null)
        ) {
          return this.toastr.infoToastr('Update your Bitcoin address');
        }

        if (
          x.value.withdrawto == 'USDT(ERC20)' &&
          (this.usdt == 'Not set' || this.usdt == '' || this.usdt == null)
        ) {
          return this.toastr.infoToastr('Update your Usdt(erc20) address');
        }

        if (amount <= this.acc) {
          let me = {
            withdraw: amount,
            withdrawto: x.value.withdrawto,
            withdrawfrom: x.value.withdrawfrom,
            val: this.cookieValue,
            key: 'withdraw',
          };
          this.server.Api(me).subscribe(
            (res) => {
              if (res['code'] == 1) {
                this.toastr.successToastr(res['message'], 'Security Center');

                this.route.navigate(['/dashboard/dashcontent']);
              }
              if (res['code'] == 2) {
                this.toastr.warningToastr(res['message'], 'Security Center');
              } else {
                this.toastr.infoToastr(res['message']);
              }
            },
            () => {},
            () => {}
          );
        } else {
          this.toastr.infoToastr('You cant withdraw more than you balance');
        }
      }
    } else {
      this.toastr.infoToastr('You cant withdraw less than' + this.withlimit);
    }
  }

  logOut() {
    $('#exampleModalLive').css('display', 'none');

    this.route.navigate(['/dashboard/dashcontent']);
  }

  withdrawAll() {
    if (
      confirm(
        'Are you sure you want to close this account? This action cannot be reversed.'
      )
    ) {
      console.log('Thing was saved to the database.');
    } else {
      console.log('Thing was not saved to the database.');
    }
  }
}
