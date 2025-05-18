import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DataService } from '../../../data.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { SessionStorageService } from 'angular-web-storage';

declare let $;
@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss'],
})
export class DepositComponent implements OnInit {
  currentUrl: string;
  acc: any;
  plan: any;
  users: any;
  step: number = 1;
  profit: any;
  Id: any;
  amount: any;
  amount1: any;
  term: any;
  paymethod: any;
  ammethod: any;
  percent: any;
  netprofit: any;
  amountTopay: any;
  addressTopay: any;
  pucg: number = 0;
  show = 1;
  country: any;
  promo: any;
  display: number = 0;
  bank: any;
  tic: any;
  banks: any;
  rand: any;
  amm: any;
  money = 0;
  options: any;
  duration: any;
  spend: any;
  type: any;
  his: any;
  tra = [];
  upID: any;
  upU: any;
  upi: any;
  aqui: any;
  oron: any;
  bela: any;
  siri: any;
  cip: any;

  constructor(
    private server: DataService,
    public toastr: ToastrManager,
    public session: SessionStorageService,
    private route: Router,
    private activate: ActivatedRoute
  ) {
    route.events.subscribe((_: NavigationEnd) => (this.currentUrl = _.url));
    if ($(".toggled")) {
      $("#tog").click();
    }
    $('.app-wrap').removeClass('sidebar-toggled');
    this.duration = 1;

    this.activate.queryParams.subscribe((res) => {
      if (res.hasOwnProperty('dep')) {
        if (res.dep == 'contract') {
          this.step = 2;
        } else {
          this.step = 1;
        }

        this.his = res.dep;
        if ($('.sidebar-enable')[0]) {
          $('#tog').click();
        }
      }
    });
  }

  ngOnInit() {
    $('meta[name=viewport]').attr(
      'content',
      'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
    );
    this.Id = this.session.get('sessionID');
    let data = this.activate.snapshot.data;
    this.acc = data['news'].dep['message']?.[0]['mainaccountbal'];
    this.country = data['news'].dep['message']?.[0]['country'];
    this.promo = data['news'].promo['message']?.[0]['status'];
    // this.upi = data['news'].upi['message']?.[0]['status'];
    this.users = data['news'].dep['message']?.[0]['username'];
    this.display = 0;
    this.bank = 0;


    // this.plans = data['news'].allIn['message'];



if(data['news'].allIn['message'].length > 0){
   this.aqui =  data['news'].allIn['message'].filter(plan => plan.plan === 'AQUI').length
   this.oron =  data['news'].allIn['message'].filter(plan => plan.plan === 'ORON').length
   this.bela =  data['news'].allIn['message'].filter(plan => plan.plan === 'BELA').length
   this.siri =  data['news'].allIn['message'].filter(plan => plan.plan === 'SIRI').length
   this.cip =  data['news'].allIn['message'].filter(plan => plan.plan === 'CIPs').length
}


    this.tra = data['news'].his['plann'].filter(
      (word) => word.type == 'Invest'
    );
  }

  calculate(x: NgForm) {
    this.options = this.options;
    let Deposit = parseFloat(x.value.deposit);
    let spendFrom = x.value.spend;
    if (this.options == 'AQUI') {
      this.term = 1;

      if (Deposit >= 25 && Deposit <= 249) {
        this.profit = Math.floor(Deposit * 1.12);
        this.percent = 1.12;
      } else {
        return this.toastr.warningToastr(
          `$${Deposit} not avalable for this plan`
        );
        // this.profit = Math.floor(Deposit * 1.12);
        // this.percent = 1.12;
      }
    }
    if (this.options == 'ORON') {
      this.term = 4;
      if (Deposit >= 250 && Deposit <= 999) {
        this.profit = Math.floor(Deposit * 1.35);
        this.percent = 1.35;
      } else {
        return this.toastr.warningToastr(
          `$${Deposit} not avalable for this plan`
        );
        // this.profit = Math.floor(Deposit * 1.35);
        // this.percent = 1.35;
      }
    }
    if (this.options == 'BELA') {
      this.term = 6;
      if (Deposit >= 1000 && Deposit <= 9999) {
        this.profit = Math.floor(Deposit * 1.45);
        this.percent = 1.45;
      } else {
        return this.toastr.warningToastr(
          `$${Deposit} not avalable for this plan`
        );
        // this.profit = Math.floor(Deposit * 2.2);
        // this.percent = 2.2;
      }
    }

    if (this.options == 'SIRI') {
      this.term = 8;
      if (Deposit >= 10000) {
        this.profit = Math.floor(Deposit * 1.5);
        this.percent = 1.5;
      } else if (Deposit < 10000) {
        return this.toastr.warningToastr(
          `$${Deposit} not avalable for this plan`
        );
        // this.profit = Math.floor(Deposit * 3.0);
        // this.percent = 3.0;
      }
    }
    if (this.options == 'CIPs') {
      this.term = 6;
      if (Deposit >= 10000 && Deposit <= 50000) {
        this.profit = Math.floor(Deposit * 2.0);
        this.percent = 2.0;
      } else {
        return this.toastr.warningToastr(
          `$${Deposit} not avalable for this plan`
        );
        // this.profit = Math.floor(Deposit * 2.2);
        // this.percent = 2.2;
      }
    }

    if (this.options == 'PROMO') {
      this.term = 5;
      if (Deposit >= 1000 && Deposit <= 2999) {
        this.profit = Math.floor(Deposit * 5.0);
        this.percent = 5.0;
      } else {
        return this.toastr.warningToastr(
          `$${Deposit} not avalable for this plan`
        );
        // this.profit = Math.floor(Deposit * 4.0);
        // this.percent = 4.0;
      }
    }

    if (this.options == 'SPECIAL PROMO') {
      this.term = 5;
      if (Deposit >= 3000 && Deposit <= 9999) {
        this.profit = Math.floor(Deposit * 5.0) + 5000;
        this.percent = (((this.profit / Deposit) * 100) / 100).toFixed(2);
      } else {
        return this.toastr.warningToastr(
          `$${Deposit} not avalable for this plan`
        );
        // this.profit = Math.floor(Deposit * 4.0) + 4000;
        // this.percent = (((this.profit / Deposit) * 100) / 100).toFixed(2);
      }
    }

    if (this.options == 'PROMO PRO') {
      if (Deposit >= 10000) {
        this.profit = Math.floor(Deposit * 5.0) + 15000;
        this.percent = (((this.profit / Deposit) * 100) / 100).toFixed(2);
      } else {
        return this.toastr.warningToastr(
          `$${Deposit} not avalable for this plan`
        );
      }
    }

    this.netprofit = this.profit - Deposit;
    this.ammethod = Deposit;
    this.plan = this.options;
    this.type = 'Invest';
    this.paymethod = spendFrom;
    this.display = 1;
    this.money = 2;
  }

  calc() {
    this.options = this.options;
    let Deposit = parseFloat(this.amount1);
    let spendFrom = this.spend;
    if (!this.amount1) {
      return this.toastr.warningToastr('Input amount');
    }

    if (this.options == 'Basic') {
      this.term = 1;
      if (Deposit >= 10000 && Deposit <= 25000) {
        this.profit = (Deposit * ((1.48 - 1) * this.duration + 1)).toFixed(2);
        this.percent = 1.48;
      } else {
        return this.toastr.warningToastr(
          `$${Deposit} not avalable for this plan`
        );
        // this.profit = (Deposit * ((1.48 - 1) * this.duration + 1)).toFixed(2);
        // this.percent = 1.48;
      }
    }

    if (this.options == 'Performer') {
      this.term = 1;
      if (Deposit >= 26000 && Deposit <= 50000) {
        this.profit = (Deposit * ((1.56 - 1) * this.duration + 1)).toFixed(2);
        this.percent = 1.56;
      } else {
        return this.toastr.warningToastr(
          `$${Deposit} not avalable for this plan`
        );
        // this.profit = (Deposit * ((1.56 - 1) * this.duration + 1)).toFixed(2);
        // this.percent = 1.56;
      }
    }

    if (this.options == 'Supreme') {
      this.term = 1;
      if (Deposit >= 51000 && Deposit <= 100000) {
        this.profit = (Deposit * ((1.62 - 1) * this.duration + 1)).toFixed(2);
        this.percent = 1.62;
      } else {
        return this.toastr.warningToastr(
          `$${Deposit} not avalable for this plan`
        );
        // this.profit = (Deposit * ((1.62 - 1) * this.duration + 1)).toFixed(2);
        // this.percent = 1.62;
      }
    }

    if (this.options == 'Turbo') {
      this.term = 1;
      if (Deposit >= 102000 && Deposit <= 5000000) {
        this.profit = (Deposit * ((1.8 - 1) * this.duration + 1)).toFixed(2);
        this.percent = 1.8;
      } else {
        return this.toastr.warningToastr(
          `$${Deposit} not avalable for this plan`
        );
        // this.profit = (Deposit * ((1.8 - 1) * this.duration + 1)).toFixed(2);
        // this.percent = 1.8;
      }
    }

    this.netprofit = this.profit - Deposit;
    this.ammethod = Deposit;
    this.plan = this.options;
    this.paymethod = spendFrom;
    this.type = 'Contract';
    this.pucg = 1;

    this.Deposit();
  }

  atLeastOneRadio() {
    console.log('sdishi', this.options);
    if (this.options == null) {
      this.toastr.warningToastr('Select an investment scheme', 'security');
    } else {
      return true;
    }
  }

  atLeastOneRadiodis() {
    if ($('input[type=select]:selected').length > 0) {
      return true;
    } else {
      return false;
    }
  }
  chek() {
    if (this.options == null || $('#custom-amount').val() == 0) {
      return false;
    } else {
      return true;
    }
  }

  Deposit() {
    if (
      this.paymethod == 'BTC' ||
      this.paymethod == 'USDT(ERC20)' ||
      this.paymethod == 'USDT(TRC20)' ||
      this.paymethod == 'USDT(BEP20)' ||
      this.paymethod == 'USDC(BEP20)' ||
      this.paymethod == 'UPI' ||
      (this.paymethod == 'ETH' && this.netprofit && this.ammethod && this.plan)
    ) {
      let med = {
        user_id: this.Id,
        plan: this.plan,
        profit: this.profit,
        amount: this.ammethod,
        username: this.users,
        paymethod: this.paymethod,
        type: this.type,
        percent: this.percent,
        duration: this.duration ? this.duration : 1,
        key: 'depoBitcoin',
      };

      this.server.Api(med).subscribe((res) => {
        if (res['message']) {
          this.toastr.infoToastr(res['message'], 'security');
        }
        if (res['code'] == 1) {
          this.amountTopay = '$' + res['amount_btc'];
          this.addressTopay = res['address'];
          this.tic = res['tic'];
          if (this.tic == 'UPI') {
            this.amountTopay =  '₹' + res['amount_btc'] * 85;
            this.upU = res['address'];
            this.upID = res['upname'];
          }
          this.bank = 2;
        }
      });
    } else if (
      this.paymethod == 'Bank' &&
      this.netprofit &&
      this.ammethod &&
      this.plan
    ) {
      let med = {
        user_id: this.Id,
        plan: this.plan,
        profit: this.profit,
        amount: this.ammethod,
        username: this.users,
        type: 'Invest',
        paymethod: this.paymethod,
        percent: this.percent,
        key: 'depoBank',
      };
      this.server.Api(med).subscribe(
        (res) => {
          if (res['message']) {
            this.toastr.infoToastr(res['message'], 'security');
          }
          if (res['code'] == 1) {
            this.banks = res['banks'];
            this.rand = res['payment'];
            this.amm = '₹' + res['amount'] * 85;
            // this.amm = Number(this.amm.toPrecision(2));
            this.bank = 1;
          }
        },
        () => {},
        () => {}
      );
    } else {
      if (
        this.paymethod == 'Account' &&
        this.netprofit &&
        this.ammethod &&
        this.plan
      ) {
        let payload = {
          plan: this.plan,
          username: this.users,
          profit: this.profit,
          amount: this.ammethod,
          paymethod: this.paymethod,
          val: this.Id,
          percent: this.percent,
          type: this.type,
          duration: this.duration ? this.duration : 1,
          key: 'depo',
        };
        this.server.Api(payload).subscribe((res) => {
          if (res['message']) {
            this.toastr.infoToastr(res['message'], 'security');
          }
          if (res['code'] == 1) {
            this.toastr.successToastr('Your Deposit is Accepted', null, {
              animate: 'fade',
            });
          }

          if (res['code'] == 2) {
            this.toastr.warningToastr(
              'You have insufficent funds in your wallet for this plan',
              null,
              { animate: 'fade' }
            );
          }

          if (res['code'] == 3) {
            this.toastr.errorToastr(
              'Deposit not accepted, you have an active deposite',
              null,
              { animate: 'fade' }
            );
          }
        });
      } else {
        this.toastr.errorToastr('Please select an amount', 'Security Center');
      }
    }
  }

  copy() {
    var copyText = $('#refUrl');
    copyText.select();
    document.execCommand('copy');
    this.toastr.successToastr('Link copied');
    // this.route.navigate(['/dashboard/capture']);
  }
}
