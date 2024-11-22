import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { SessionStorageService } from 'angular-web-storage';
declare var $;
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  Id: any;
  step: any;
  dep = [];
  with = [];
  constructor(
    private server: DataService,
    public session: SessionStorageService
  ) {
    if ($(".toggled")) {
      $("#tog").click();
    }
    $('.app-wrap').removeClass('sidebar-toggled');
    this.Id = this.session.get('sessionID');
    this.step = 1;
  }

  ngOnInit(): void {
    let key = {
      key: 'joinr',
      token: this.Id,
    };

    this.server.Api(key).subscribe((res) => {
      console.log(res);
      this.dep = res['dep'];
      this.with = res['with'];
    });
  }
}
