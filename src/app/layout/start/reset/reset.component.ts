import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { SessionStorageService } from 'angular-web-storage';
import { NgForm } from '@angular/forms';
declare let $;
@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
})
export class ResetComponent implements OnInit {
  token: string;
  visible: any;
  cookieValue: any;
  constructor(
    private route: ActivatedRoute,
    private server: DataService,
    private nav: Router,
    private toastr: ToastrManager,
    private session: SessionStorageService
  ) {
    $('meta[name=viewport]').attr(
      'content',
      'width=device-width,height=device-height,initial-scale=1,maximum-scale=1'
    );
  }
  ngOnInit() {
    $('.loader').fadeOut();
    $('#preloder').delay(400).fadeOut('slow');

    this.route.queryParams
      .filter((params) => params.verify)
      .subscribe((params) => {
        this.token = params.verify; // popular
      });
    if (this.token.length == 64) {
      let token = {
        token: this.token,
        key: 'tokenVerify',
      };
      this.server.Api(token).subscribe((res) => {
        console.log(res);
        if (res['code'] == 1) {
          console.log(res);
          let bag = res['message'];
          this.session.set('sessionID', bag);
          this.visible = res['code'];
        } else if (res['code'] == 2) {
          this.visible = res['code'];
        }
      });
    } else {
      this.nav.navigate(['/']);
    }
  }
  analyze(x) {
    var strongRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
    );
    var mediumRegex = new RegExp(
      '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})'
    );
    if (strongRegex.test(x)) {
      document.getElementById('id_pass').style.borderBottom = '2px solid green';
      this.toastr.successToastr('Strong password', 'Security Center');
    } else if (mediumRegex.test(x)) {
      document.getElementById('id_pass').style.borderBottom =
        '2px solid orange';
      this.toastr.warningToastr('Fairly Strong', 'Security center');
    } else {
      document.getElementById('id_pass').style.borderBottom = '2px solid red';
      this.toastr.errorToastr('Weak Password', 'Security Center');
    }
  }
  ChangePass(x: NgForm) {
    console.log(x.value);
    if (this.server.CheckLogin()) {
      this.cookieValue = this.session.get('sessionID');

      if (x.value.Password === x.value.CPassword) {
        let pass = {
          pass: x.value.Password,
          token: this.cookieValue,
          key: 'changePass',
        };
        this.server.Api(pass).subscribe((res) => {
          if (res['code'] == 1) {
            this.toastr.successToastr('Password changed successfully');
            x.reset();
          }
        });
      } else {
        document.getElementById('id_cpass').style.borderBottom =
          '2px solid red';
        this.toastr.warningToastr('Password not in sync');
      }
    }
  }
}
