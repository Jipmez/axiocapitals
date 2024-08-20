import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

/* import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic"; */
import { DataService } from 'src/app/data.service';
import { ToastrManager } from 'ng6-toastr-notifications';
declare let $;
@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss'],
})
export class MailComponent implements OnInit {
  /*  public Editor = ClassicEditor; */
  mail: [];
  constructor(
    private activate: ActivatedRoute,
    private server: DataService,
    private toastr: ToastrManager
  ) {}

  ngOnInit(): void {
    let data = this.activate.snapshot.data;
    console.log(data);

    this.mail = data['mail']['mail'];
  }

  Mails(x: NgForm) {
    console.log(x.value);
    let data = {
      data: x.value,
      key: 'malpost',
    };

    this.server.Api(data).subscribe((x) => {
      console.log(x);
      //this.toastr.successToastr(x["message"], "Security center");
    });
  }

  addUser() {
    let user = {
      key: 'addEmail',
      email: $('#email').val(),
    };

    this.server.Api(user).subscribe((x) => {
      this.mail = x['mail'];
      this.toastr.successToastr(x['message'], 'Security center');
    });
  }
}
