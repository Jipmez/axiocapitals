import { Component, OnInit, ViewContainerRef, Inject } from '@angular/core';
import { DataService } from '../../../data.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import {
  LocalStorageService,
  SessionStorageService,
  LocalStorage,
  SessionStorage,
} from 'angular-web-storage';

import { ToastrManager } from 'ng6-toastr-notifications';

declare var $;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  currentUrl: string;
  cookieValue: string;
  sidebarVisible: boolean;
  user: any;
  location: string;
  profileId: any;
  acc: any;
  full: any;
  status: any;
  menu: any;
  men: boolean = false;
  email: any;

  constructor(
    private server: DataService,
    vcr: ViewContainerRef,
    private cookieService: CookieService,
    public session: SessionStorageService,
    public toastr: ToastrManager,
    private activate: ActivatedRoute,
    private route: Router
  ) {
    route.events.subscribe((_: NavigationEnd) => (this.currentUrl = _.url));
    this.sidebarVisible = false;
    this.location = window.location.origin;
  }

  ngOnInit() {
    this.cookieValue = this.session.get('sessionID');

    let data = this.activate.snapshot.data;
    this.user = data['news'].dep['message']?.[0]['username'];
    this.email = data['news'].dep['message']?.[0]['email'];
    this.profileId = data['news'].dep['message']?.[0]['profileId'];
    this.acc = data['news'].dep['message']?.[0]['mainaccountbal'];
    this.full = data['news'].dep['message']?.[0]['fullname'];
    this.status = data['news'].dep['message']?.[0]['status'];
  }

  toggleme() {
    if (window.innerWidth <= 920 || window.innerWidth > 920) {
      if (this.sidebarVisible === true) {
        this.sidebarCloseMob();
        this.sidebarVisible = false;
      } else {
        this.sidebarOpenMob();
        this.sidebarVisible = true;
      }
    }
  }

  sidebarCloseLap() {
    $('.sidenav').css('margin-left', '-260px');
    $('.main-content').css('margin-left', '0px');
    $('.our-nav').css('margin-left', '0px');
  }
  sidebarOpenLap() {
    $('.sidenav').css('margin-left', '0px');
    $('.main-content').css('margin-left', '19.5%');
    $('.our-nav').css('margin-left', '19.5%');
  }

  sidebarCloseMob() {
    console.log('sdojweqweqw');
    $('.app-wrap').removeClass('sidebar-toggled');
    // $('.simplebar-content-wrapper').css({ height: 'auto', overflow: 'scroll' });
    // $('.simplebar-placeholder').css({ width: '0px', height: '0px' });
    // $('.left-side-menu').removeClass('d-block');
  }

  sidebarOpenMob() {
    console.log('aadssdoj');
    $('.app-wrap').addClass('sidebar-toggled');
    // $('.simplebar-content-wrapper').css({ height: '100%', overflow: 'scroll' });
    // $('.simplebar-placeholder').css({ width: 'auto', height: '451px' });
    // $('.left-side-menu').addClass('d-block');
  }

  logOut() {
    this.server.logOut();
  }

  togmenu(x) {
    this.men = !this.men;
    if (this.men) {
      this.menu = x;
    } else {
      this.menu = 0;
    }
  }

  copy() {
    /* Get the text field */
    console.log('me');
    var copyText = $('#yu');

    console.log(copyText);
    /* Select the text field */
    copyText.select();
    // copyText.setSelectionRange(0, 99999); /*For mobi
    /* Copy the text inside the text field */
    document.execCommand('copy');
    this.toastr.successToastr('Link copied');
  }
}
