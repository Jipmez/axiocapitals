import {
  Inject,
  Renderer2,
  Component,
  OnInit,
  ViewContainerRef,
  ChangeDetectorRef,
} from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { CookieService } from "ngx-cookie-service";
import { NgForm } from "@angular/forms";
import { ToastrManager } from "ng6-toastr-notifications";
import { DataService } from "../../../data.service";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { SessionStorageService } from "angular-web-storage";

declare var $;
declare const TradingView: any;

@Component({
  selector: "app-dashcontent",
  templateUrl: "./dashcontent.component.html",
  styleUrls: ["./dashcontent.component.scss"],
})
export class DashcontentComponent implements OnInit {
  currentUrl: string;
  username: any;
  totprof: any;
  total: any;
  monthpro: any;
  sta: boolean;
  created: any;
  login: any;
  loan: any;
  plan = [];
  email: any;
  status: any;

  constructor(
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    private server: DataService,
    private cookieService: CookieService,
    public toastr: ToastrManager,
    private chRef: ChangeDetectorRef,
    public session: SessionStorageService,
    private route: Router,
    private activate: ActivatedRoute,
    vcr: ViewContainerRef
  ) {
    route.events.subscribe((_: NavigationEnd) => (this.currentUrl = _.url));

    if ($(".toggled")) {
      $("#tog").click();
    }
  }
  stat: any;
  dep = [];
  acc;
  earn;
  earnn;
  pwith;
  lastwith;
  totwith;
  totdep;
  lastdep;
  Chart;
  per;
  cookieValue = this.session.get("sessionID");

  /*  ngAfterViewInit() {
    $('[data-toggle="popover"]').popover();
  } */
  ngOnInit() {
    $("meta[name=viewport]").attr(
      "content",
      "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    );

    let dep = {
      val: this.cookieValue,
      key: "dep",
    };
    this.server.Api(dep).subscribe(
      (res) => {
        if (res["code"] == 1) {
          this.plan = res["plan"];

          console.log(this.plan);
        }
      },
      () => {},
      () => {}
    );

    let data = this.activate.snapshot.data;
    this.dep = data["news"].types["message"];
    this.username = data["news"].dep["message"][0]["username"];
    this.earn = data["news"].dep["message"][0]["earning"];
    this.acc = data["news"].dep["message"][0]["mainaccountbal"];
    this.status = data["news"].dep["message"][0]["status"];
    this.loan = data["news"].dep["message"][0]["loan_bal"];
    this.created = data["news"].dep["message"][0]["date_created"];
    this.login = data["news"].dep["message"][0]["last_login"];
    this.stat = data["news"].dep["message"][0]["status"];
    this.pwith = data["news"].dep["pwith"];
    this.lastwith = data["news"].dep["lastwith"];
    this.totwith = data["news"].dep["totwith"];
    this.totdep = data["news"].dep["totdep"];
    this.totprof = data["news"].dep["totpro"];
    this.lastdep = data["news"].dep["lastdep"];
    this.monthpro = data["news"].dep["monthpro"];
    this.total = data["news"].dep["add"];
    this.email = data["news"].dep["message"][0]["email"];
  }

  redirectTo(uri) {
    this.route
      .navigateByUrl("/", { skipLocationChange: true })
      .then(() => this.route.navigate([uri]));
  }

  // shw() {
  //   this.server.showLoader();
  // }

  cashout(x) {
    let v = document.getElementById(x);

    $(v).attr("disabled", true);
    let out = {
      depID: x,
      token: this.cookieValue,
      key: "cashout",
    };

    this.server.Api(out).subscribe((res) => {
      if (res) {
        this.toastr.successToastr("Security center", res["message"]);

        let v = document.getElementById(x);
        $(v).remove();
        /*
        this.route
          .navigateByUrl("dashboard", { skipLocationChange: true })
          .then(() => this.route.navigate(["/dashboard/dashcontent"])); */
      }
    });
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

    const s = this._renderer2.createElement("script");
    s.type = "text/javascript";
    s.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    s.async = true;
    let me = {
      symbols: [
        {
          proName: "FOREXCOM:SPXUSD",
          title: "S&P 500",
        },
        {
          proName: "FOREXCOM:NSXUSD",
          title: "Nasdaq 100",
        },
        {
          proName: "FX_IDC:EURUSD",
          title: "EUR/USD",
        },
        {
          proName: "BITSTAMP:BTCUSD",
          title: "BTC/USD",
        },
        {
          proName: "BITSTAMP:ETHUSD",
          title: "ETH/USD",
        },
      ],
      colorTheme: "light",
      isTransparent: false,
      displayMode: "adaptive",
      locale: "en",
    };
    s.innerHTML = JSON.stringify(me);

    this._renderer2.appendChild(this._document.getElementById("sagee"), s);
  }
}
