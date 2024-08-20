import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DOCUMENT } from '@angular/common';
import { DataService } from '../../../data.service';
import { Router } from '@angular/router';
import { SessionStorageService } from 'angular-web-storage';
import { NgxSpinnerService } from 'ngx-spinner';

declare let $;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private server: DataService,
    private toastr: ToastrManager,
    private _renderer2: Renderer2,
    public session: SessionStorageService,
    private spinner: NgxSpinnerService,
    private route: Router,
    @Inject(DOCUMENT) private _document: Document
  ) {
    $('meta[name=viewport]').attr(
      'content',
      'width=device-width,height=device-height,initial-scale=1,maximum-scale=1'
    );
  }

  ngOnInit() {
    this.server.render(
      this._renderer2,
      'https://translate.yandex.net/website-widget/v1/widget.js?widgetId=ytWidget&pageLang=en&widgetTheme=light&autoMode=false',
      this._document
    );

    $('.toggle-password').click(function () {
      $(this).toggleClass('fa-eye fa-eye-slash');
      var input = $('#me');
      if (input.attr('type') == 'password') {
        input.attr('type', 'text');
      } else {
        input.attr('type', 'password');
      }
    });
  }

  logIn(x: NgForm) {
    var emailRe = /^.+@.+\..{2,4}$/;

    /*     if (x.value.email.match(emailRe)) { */
    let comingUser = [x.value.email, x.value.password];

    let err = ['email is incorrect', 'password should not be less than three'];

    let p = 0;
    let count = 0;

    while (p < comingUser.length) {
      if (comingUser[p].length < 1) {
        this.toastr.warningToastr(err[p]);
        break;
      } else {
        count++;
      }
      p++;
    }

    if (count == comingUser.length) {
      let logInfo = {
        email: x.value.email,
        password: x.value.password,
        key: 'log',
      };

      this.spinner.show();
      this.server.Api(logInfo).subscribe(
        (res) => {
          if (res['code'] == 1) {
            this.toastr.successToastr(res['message'], 'Security center');
            let bag = res['token'];
            this.session.set('sessionID', bag);
            // this.cookieService.set("logID", bag);

            this.route.navigate(['dashboard']);
          }

          if (res['code'] == 2) {
            this.toastr.successToastr(
              res['message'],
              'Redirecting to dashboard'
            );
            let bag = res['token'];
            this.session.set('adminID', bag);
            this.route.navigate(['hkgjiinif684080ngi98084g06']);
          }

          if (res['code'] == 3) {
            this.toastr.warningToastr(res['message'], 'Security center');
          }
        },
        () => {
          this.spinner.hide();
        },
        () => {
          this.spinner.hide();
        }
      );
    }
  }
}
