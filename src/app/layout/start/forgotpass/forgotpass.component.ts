import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
declare let $;
@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.scss'],
})
export class ForgotpassComponent implements OnInit {
  constructor(
    private server: DataService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrManager
  ) {
    $('meta[name=viewport]').attr(
      'content',
      'width=device-width,height=device-height,initial-scale=1,maximum-scale=1'
    );
  }

  ngOnInit() {
    $('.loader').fadeOut();
    $('#preloder').delay(400).fadeOut('slow');
  }

  forgotPass(x: NgForm) {
    this.spinner.show();
    var emailRe = /^.+@.+\..{2,4}$/;
    if (x.value.email.match(emailRe)) {
      let forgot = {
        email: x.value.email,
        key: 'forgot',
      };
      this.server.Api(forgot).subscribe((res) => {
        if (res['code'] == 1) {
          this.toastr.successToastr('Message sent successfully', 'Security');
          x.reset();
          this.spinner.hide();
        } else if (res['code'] == 2) {
          this.toastr.warningToastr('Input a correct email', 'Security');
          x.reset();
          this.spinner.hide();
        }
        x.reset();
        this.spinner.hide();
      });
    }
  }
}
