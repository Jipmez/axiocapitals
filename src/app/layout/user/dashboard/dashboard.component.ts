import { Component, OnInit, ViewContainerRef, ElementRef, ViewChild, Inject, AfterViewInit } from "@angular/core";
import { DataService } from "../../../data.service";
import { CookieService } from "ngx-cookie-service";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import {
  LocalStorageService,
  SessionStorageService,
  LocalStorage,
  SessionStorage,
} from "angular-web-storage";



declare var $;
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {

  @ViewChild('audioRef') audioRef!: ElementRef<HTMLAudioElement>;

  currentUrl: string;
  cookieValue: string;
  sidebarVisible: boolean;
  user: any;
  location: string;
  profileId: any;

  constructor(
    private server: DataService,
    vcr: ViewContainerRef,
    private cookieService: CookieService,
    public session: SessionStorageService,
    private activate: ActivatedRoute,
    private route: Router
  ) {
    route.events.subscribe((_: NavigationEnd) => (this.currentUrl = _.url));
    this.sidebarVisible = false;
    this.location = window.location.origin;
  }

  ngOnInit() {
    this.cookieValue = this.session.get("sessionID");
    // $(".win").trigger("play");
    let data = this.activate.snapshot.data;
    this.user = data["news"].dep["message"][0]["username"];
    this.profileId = data["news"].dep["message"][0]["profileId"];
  }
  ngAfterViewInit() {
    // The audio element is now available
    // this.ensureVideoPlays()
  
  }



  playAudio() {
    this.audioRef.nativeElement.play().catch(error => {
      console.error('Error trying to play audio:', error);
    });
  }


  toggleme() {
    /*   if (window.innerWidth > 920) {
      if (this.sidebarVisible === true) {
        this.sidebarCloseLap();
        this.sidebarVisible = false;
      } else {
        this.sidebarOpenLap();
        this.sidebarVisible = true;
      }
    } */
    console.log(this.sidebarVisible);
    if (window.innerWidth <= 920 || window.innerWidth > 920) {
      if (this.sidebarVisible === true) {
        $("#sidebar").addClass("toggled");
        this.sidebarVisible = false;
        console.log(this.sidebarVisible);
      } else {
        $("#sidebar").removeClass("toggled");
        this.sidebarVisible = true;
        console.log(this.sidebarVisible);
      }
    }
  }

  sidebarCloseLap() {
    $(".sidenav").css("margin-left", "-260px");
    $(".main-content").css("margin-left", "0px");
    $(".our-nav").css("margin-left", "0px");
  }
  sidebarOpenLap() {
    $(".sidenav").css("margin-left", "0px");
    $(".main-content").css("margin-left", "19.5%");
    $(".our-nav").css("margin-left", "19.5%");
  }

  sidebarCloseMob() {
    console.log("sdojweqweqw");
    $(".bod").removeClass("sidebar-enable");
    $(".simplebar-content-wrapper").css({ height: "auto", overflow: "hidden" });
    $(".simplebar-placeholder").css({ width: "0px", height: "0px" });
    $(".left-side-menu").removeClass("d-block");
  }

  sidebarOpenMob() {
    console.log("aadssdoj");
    $(".bod").addClass("sidebar-enable");
    $(".simplebar-content-wrapper").css({ height: "100%", overflow: "hidden" });
    $(".simplebar-placeholder").css({ width: "auto", height: "451px" });
    $(".left-side-menu").addClass("d-block");
  }

  logOut() {
    this.server.logOut();
  }
}
