import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DataService } from '../../../data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

declare let $;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  login = [];
  order: any;
  plan: string;
  referal: any;
  get: any;
  radioValue: any;
  amount: any;
  constructor(
    private server: DataService,
    private toastr: ToastrManager,
    public cookieService: CookieService,
    private spinner: NgxSpinnerService,
    private route: Router,
    private router: ActivatedRoute
  ) {
    $('meta[name=viewport]').attr(
      'content',
      'width=device-width,height=device-height,initial-scale=1,maximum-scale=1'
    );
  }

  ngOnInit() {
    this.router.queryParams
      .filter((params) => params.ref)
      .subscribe((params) => {
        console.log(params); // {order: "popular"}

        this.order = params.ref;
        console.log(this.order); // popular
      });

    $('#warn').click();
    if (localStorage.getItem('plan') === null) {
      //this.route.navigate(['/']);
    } else {
      this.get = JSON.parse(localStorage.getItem('plan'));

      if (this.get) {
        this.plan = this.get.plan;
      }
    }

    $('.js-example-basic-single').select2();

    this.router.queryParams
      .filter((params) => params.ref)
      .subscribe((params) => {
        this.order = params.ref;
        this.referal = this.order; // popular
      });

    $('.toggle-password').click(function () {
      $(this).toggleClass('fa-eye fa-eye-slash');
      var input = $('#id_pass');
      if (input.attr('type') == 'password') {
        input.attr('type', 'text');
      } else {
        input.attr('type', 'password');
      }
    });
  }

  show() {
    $('.toggle-pasword').toggleClass('fa-eye fa-eye-slash');
    var input = $('#c_pass');
    if (input.attr('type') == 'password') {
      input.attr('type', 'text');
    } else {
      input.attr('type', 'password');
    }
  }

  analyzeUsername(x) {
    var nameRe = /^[A-Z \'.-]{2,40}$/i;
    if (!x.match(nameRe)) {
      document.getElementById('id_user').style.borderBottom = '2px solid red';
    } else {
      document.getElementById('id_user').style.borderBottom = '2px solid green';
    }
  }

  checkAdress(x) {
    if (x.length < 2) {
      document.getElementById('id_add').style.borderBottom = '2px solid red';
    } else {
      document.getElementById('id_add').style.borderBottom = '2px solid green';
    }
  }

  checkMail(x) {
    var strongEmail = /^.+@.+..{2,4}$/;

    if (x.match(strongEmail)) {
      document.getElementById('id_email').style.borderBottom =
        '2px solid green';
    } else {
      document.getElementById('id_email').style.borderBottom = '2px solid red';
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
    } else if (mediumRegex.test(x)) {
      document.getElementById('id_pass').style.borderBottom =
        '2px solid orange';
    } else {
      document.getElementById('id_pass').style.borderBottom = '2px solid red';
    }
  }

  sub() {
    this.radioValue = $("input[name='tools']:checked").val();
    if (this.radioValue) {
      $('#submit').click();
    }
  }

  Reg(x: NgForm) {
    var nameRe = /^[A-Z \'.-]{2,40}$/i;
    var emailRe = /^.+@.+\..{2,4}$/;

    if (!x.value.email.match(emailRe)) {
      this.toastr.errorToastr('Please input a correct email');
    }

    if (!x.value.username.match(nameRe)) {
      this.toastr.errorToastr('Username error');
    }
    /*
    if (x.value.password === x.value.cpass) {
      var password = x.value.password;
    } else {
      this.toastr.errorToastr('incorrect password match');
    } */

    if (x.value.email.match(emailRe) && x.value.username.match(nameRe)) {
      let comingUser = [x.value.username, x.value.email, x.value.password];
      let err = ['fullname', 'username', 'email', 'password'];
      let p = 0;
      let count = 0;

      while (p < comingUser.length) {
        if (comingUser[p].length < 2) {
          this.toastr.errorToastr(err[p] + 'should be more than two letters');
          break;
        } else {
          count++;
        }
        p++;
      }

      if (count == comingUser.length) {
        if (!this.order) {
          let msg = {
            //fullname: x.value.fullname,
            username: x.value.username,
            email: x.value.email,
            password: x.value.password,
            //ref: this.order,
            // coin: this.radioValue,
            //phone: x.value.phone,
            // plan: this.get == null ? this.amount : this.get,
            country: x.value.country,
            key: 'reg',
          };
          this.toastr.successToastr('Creating Account');
          this.server.Api(msg).subscribe(
            (res) => {
              if (res['code'] == '1') {
                this.toastr.successToastr('Account created successfully');
                if (this.login.push('me')) {
                  this.route.navigate(['/login']);
                }
              } else {
                this.toastr.infoToastr(res['message']);
              }
            },
            () => {},
            () => {}
          );
        } else {
          let msg = {
            username: x.value.username,
            email: x.value.email,
            password: x.value.password,
            ref: this.order,
            //phone: x.value.phone,
            // coin: this.radioValue,
            // plan: this.get == null ? this.amount : this.get,
            country: x.value.country,
            key: 'regref',
          };

          this.toastr.successToastr('Creating Account');
          this.spinner.show();
          this.server.Api(msg).subscribe(
            (res) => {
              if (res['code'] == '1') {
                this.toastr.successToastr('Account created successfully');
                if (this.login.push('me')) {
                  this.route.navigate(['/login']);
                }
              } else {
                this.toastr.infoToastr(res['message']);
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
  }

  tog() {
    $('#met').toggleClass('show');
  }
}
