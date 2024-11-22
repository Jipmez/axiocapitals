import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SessionStorageService } from 'angular-web-storage';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DataService } from '../../../data.service';
declare var $;

@Component({
  selector: 'app-capture',
  templateUrl: './capture.component.html',
  styleUrls: ['./capture.component.scss'],
})
export class CaptureComponent implements OnInit {
  token;
  constructor(
    private server: DataService,
    private routte: ActivatedRoute,
    private toastr: ToastrManager,
    public session: SessionStorageService
  ) {
    this.token = this.session.get('sessionID');
    if ($(".toggled")) {
      $("#tog").click();
    }

    $('.app-wrap').removeClass('sidebar-toggled');
  }

  ngOnInit(): void {}

  Hash(x: NgForm) {
    let med = {
      hash: x.value.hash,
      currency: x.value.currency,
      token: this.token,
      key: 'hash',
    };
    this.server.Api(med).subscribe((res) => {
      if (res['code'] == 1) {
        this.toastr.successToastr('hash updated');
      }
      if (res['code'] == 2) {
        this.toastr.warningToastr('Failed to update');
      }
    });
  }
}
