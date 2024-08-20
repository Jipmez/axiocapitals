import {
  Component,
  OnInit,
  ViewContainerRef,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DataService } from '../../../data.service';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
declare var $;

@Component({
  selector: 'app-adcontent',
  templateUrl: './adcontent.component.html',
  styleUrls: ['./adcontent.component.scss'],
})
export class AdcontentComponent implements OnInit {
  bitcoin: any;
  deposit: any;
  address: any;
  constructor(
    private route: ActivatedRoute,
    private chRef: ChangeDetectorRef,
    private server: DataService,
    public toastr: ToastrManager,
    private rout: Router
  ) {}

  ngOnInit() {
    let del = {
      key: 'getBank',
    };
    this.server.Api(del).subscribe((res) => {
      this.deposit = res['message'];
    });

    let bit = {
      key: 'getBitcoin',
    };
    this.server.Api(bit).subscribe((res) => {
      this.bitcoin = res['message'];
    });
  }

  deleteBank(x) {
    let dei = {
      key: 'delBank',
      id: x,
    };
    this.server.Api(dei).subscribe((res) => {
      let v = document.getElementById(x);
      $(v).remove();
    });
  }

  adAdmin(x: NgForm) {
    let admin = {
      email: x.value.email,
      password: x.value.password,
      key: 'addAdmin',
    };

    this.server.Api(admin).subscribe((res) => {
      if (res['code'] == 1) {
        this.toastr.successToastr(res['message'], 'Security center');
        x.reset();
      }

      if (res['code'] == 2) {
        this.toastr.warningToastr(res['message'], 'Security center');
        x.reset();
      }
    });
  }

  adCryp(x: NgForm) {
    let admin = {
      address: x.value.address,
      type: x.value.type,
      upid: this.address == 'UPI' ? x.value.upid : '',
      upname: this.address == 'UPI' ? x.value.upname : '',
      key: 'addCryp',
    };

    this.server.Api(admin).subscribe((res) => {
      if (res['message']) {
        this.toastr.successToastr(res['message'], 'Security center');
        x.reset();
      }
    });

    x.reset();
  }

  upi() {
    let addS = {
      key: 'startUpi',
    };
    this.server.Api(addS).subscribe((res) => {
      this.toastr.successToastr(res['message'], 'Security center');
    });
  }

  adBank(x: NgForm) {
    let bank = {
      bank: x.value.bank,
      accountname: x.value.accountname,
      branch: x.value.branch,
      account: x.value.account,
      key: 'addBank',
    };

    this.server.Api(bank).subscribe((res) => {
      if (res['code'] == 1) {
        this.toastr.successToastr(res['message'], 'Security center');
        x.reset();
      }

      if (res['code'] == 2) {
        this.toastr.warningToastr(res['message'], 'Security center');
        x.reset();
      }
    });
  }

  adBit(x: NgForm) {
    let bank = {
      bitcoin: x.value.bitcoin,
      key: 'adBitcoin',
    };
    this.server.Api(bank).subscribe((res) => {
      this.toastr.successToastr(res['message'], 'Security center');
      x.reset();
    });
  }
}
