import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastrManager } from 'ng6-toastr-notifications';
import { NgForm } from '@angular/forms';
import { DataService } from '../../../data.service';
import { CookieService } from 'ngx-cookie-service';
import { SessionStorageService } from 'angular-web-storage';
declare let $;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  bank: any;
  acc: any;
  phone: any;
  ref: any;
  withId: string;
  depoId: string;
  trust: any;
  amb: any;
  reff = [];
  with = [];
  dep = [];
  pass: any;
  withlimit: any;
  usdterc: any;
  usdt: any;
  usdttrc: any;
  trust_access: any;

  constructor(
    private route: ActivatedRoute,
    private server: DataService,
    public toastr: ToastrManager,
    private session: SessionStorageService,
    private rout: Router
  ) {
    this.withId = this.session.get('withB');
    this.depoId = this.session.get('depoU');

    $('meta[name=viewport]').attr(
      'content',
      'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
    );
  }

  username;
  fullname;
  accountbal;
  email;
  country;
  bitad;
  city;
  state;
  address;
  zip;
  logtime;
  created;
  status;
  id;
  upi;
  upname;
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    let user = {
      proid: this.id,
      key: 'proUser',
    };
    this.server.Api(user).subscribe(
      (res) => {
        if (res['code'] == 1) {
          this.username = res['message'][0]['username'];
          this.fullname = res['message'][0]['fullname'];
          this.accountbal = res['message'][0]['mainaccountbal'];
          this.trust = res['message'][0]['trust_fund'];
          this.trust_access = res['message'][0]['trust_access'];
          this.amb = res['message'][0]['ambassador'];
          this.email = res['message'][0]['email'];
          this.bitad = res['message'][0]['bitcoinaddress'];
          this.ref = res['message'][0]['referral'];
          this.country = res['message'][0]['country'];
          this.city = res['message'][0]['city'];
          this.state = res['message'][0]['state'];
          this.address = res['message'][0]['address'];
          this.zip = res['message'][0]['zip'];
          this.created = res['message'][0]['date_created'];
          this.pass = res['message'][0]['pass_name'];
          this.logtime = res['message'][0]['last_login'];
          this.status = res['message'][0]['status'];
          this.bank = res['message'][0]['bank'];
          this.upi = res['message'][0]['upiaddress'];
          this.upname = res['message'][0]['upname'];
          this.usdterc = res['message'][0]['usdtercaddress'];
          this.usdttrc = res['message'][0]['usdttrcaddress'];
          this.usdt = res['message'][0]['usdtaddress'];
          this.acc = res['message'][0]['accountnumber'];
          this.phone = res['message'][0]['phone'];
          this.withlimit = res['message'][0]['with_limit'];

          this.reff = res['ref'];
          this.with = res['with'];
          this.dep = res['dep'];
        }
      },
      () => {},
      () => {}
    );
  }

  block() {
    let block = {
      id: this.id,
      key: 'block',
    };
    this.server.Api(block).subscribe(
      (res) => {
        this.toastr.successToastr(res['message'], 'Security Center');
      },
      () => {},
      () => {}
    );
  }

  unblock() {
    let unblock = {
      id: this.id,
      key: 'unblock',
    };
    this.server.Api(unblock).subscribe(
      (res) => {
        this.toastr.successToastr(res['message'], 'Security Center');
      },
      () => {},
      () => {}
    );
  }

  WithConfirm() {
    let confirm = {
      email: this.email,
      id: this.withId,
      key: 'conwith',
    };
    this.server.Api(confirm).subscribe(
      (res) => {
        this.toastr.successToastr(res['message'], 'Security Center');
      },
      () => {},
      () => {}
    );
  }

  Xen() {
    let confirm = {
      email: this.email,
      key: 'xen',
    };
    this.server.Api(confirm).subscribe(
      (res) => {
        this.toastr.successToastr(res['message'], 'Security Center');
      },
      () => {},
      () => {}
    );
  }

  DepConfirm() {
    let confirm = {
      email: this.email,
      id: this.depoId,
      key: 'condep',
    };
    this.server.Api(confirm).subscribe(
      (res) => {
        this.toastr.successToastr(res['message'], 'Security Center');
      },
      () => {},
      () => {}
    );
  }

  person(x: NgForm) {
    let person = {
      fullname: x.value.fullname == '' ? this.fullname : x.value.fullname,
      email: x.value.email == '' ? this.email : x.value.email,
      phone: x.value.phone == '' ? this.phone : x.value.phone,
      id: this.id,
      key: 'upPerson',
    };
    this.server.Api(person).subscribe((res) => {
      this.toastr.successToastr(res['message'], 'Security Center');
    });
    x.reset();
  }

  account(x: NgForm) {
    let person = {
      bitad: x.value.bitad == '' ? this.bitad : x.value.bitad,
      account: x.value.account,
      withlimit: x.value.addlimit == '' ? this.withlimit : x.value.addlimit,
      id: this.id,
      trust: x.value.trust,
      key: 'upAccount',
    };

    this.server.Api(person).subscribe((res) => {
      x.reset();
      this.toastr.successToastr(res['message'], 'Security Center');
      x.reset();
    });

    x.reset();
  }

  Ramb() {
    let ramb = {
      email: this.email,
      key: 'ramb',
    };

    this.server.Api(ramb).subscribe((res) => {
      this.toastr.infoToastr(res['message']);
    });
  }

  Mamb() {
    let mamb = {
      email: this.email,
      key: 'mamb',
    };

    this.server.Api(mamb).subscribe((res) => {
      this.toastr.infoToastr(res['message']);
    });
  }

  Taccess() {
    let Taccess = {
      email: this.email,
      key: 'taccess',
    };

    this.server.Api(Taccess).subscribe((res) => {
      this.toastr.infoToastr(res['message']);
    });
  }

  pause(x) {
    let pause = {
      id: x,
      key: 'pauseInv',
    };

    this.server.Api(pause).subscribe((res) => {
      this.toastr.successToastr(res['message']);
    });
  }

  Compound() {
    let compound = {
      id: this.id,
      key: 'compound',
    };
    this.server.Api(compound).subscribe((res) => {
      this.toastr.successToastr(res['message']);
    });
  }
}
