import { Component, OnInit, Renderer2 } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { NgForm } from "@angular/forms";
import { DataService } from "../../../data.service";
import { Router } from "@angular/router";
import { SessionStorageService } from "angular-web-storage";
declare let $;

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"],
})
export class NavComponent implements OnInit {
  constructor(
    private server: DataService,
    private route: Router,
    private _renderer2: Renderer2,
    public session: SessionStorageService,
    public cookie: CookieService
  ) {
    $("meta[name=viewport]").attr(
      "content",
      "width=device-width, initial-scale=1"
    );
  }
  ngOnInit() {
    /*  this.server.render(this._renderer2, "../../../../assets/js/custom.js");
    this.server.render(
      this._renderer2,
      "../../../../assets/js/owl.carousel.js"
    );




    this.server.render(
      this._renderer2,
      "../../../../assets/js/jquery-3.3.1.min.js"
    );
    this.server.render(
      this._renderer2,
      "../../../../assets/js/bootstrap.min.js"
    );
    this.server.render(this._renderer2, "../../../../assets/js/modernizr.js");
    this.server.render(
      this._renderer2,
      "../../../../assets/js/jquery.menu-aim.js"
    );
    this.server.render(this._renderer2, "../../../../assets/js/plugin.js");
    this.server.render(
      this._renderer2,
      "../../../../assets/js/jquery.countTo.js"
    );
    this.server.render(this._renderer2, "../../../../assets/js/datatables.js");
    this.server.render(this._renderer2, "../../../../assets/js/dropify.min.js");
    this.server.render(
      this._renderer2,
      "../../../../assets/js/jquery.nice-select.min.js"
    );
    this.server.render(
      this._renderer2,
      "../../../../assets/js/jquery.inview.min.js"
    );
    this.server.render(
      this._renderer2,
      "../../../../assets/js/jquery.magnific-popup.js"
    );
    this.server.render(this._renderer2, "../../../../assets/js/calculator.js"); */

    // this.server.render(
    //   this._renderer2,
    //   "https://translate.yandex.net/website-widget/v1/widget.js?widgetId=ytWidget&pageLang=en&widgetTheme=light&autoMode=false"
    // );

    // this.server.render(
    //   this._renderer2,
    //   "https://translate.yandex.net/website-widget/v1/widget.js?widgetId=ytWidgett&pageLang=en&widgetTheme=light&autoMode=false"
    // );
  }

  toggle() {
    var element = document.getElementById("na");
    element.classList.add("mobile-menu-visible");
  }

  toggled() {
    var element = document.getElementById("na");
    element.classList.remove("mobile-menu-visible");
  }

  logIn(x: NgForm) {
    var emailRe = /^.+@.+\..{2,4}$/;

    if (x.value.email.match(emailRe)) {
      let comingUser = [x.value.email, x.value.password];

      let err = ["email", "wiwoo"];

      let p = 0;
      let count = 0;

      while (p < comingUser.length) {
        if (comingUser[p].length < 4) {
          // this.toastr.warning(err[p] + "is empty");
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
          key: "log",
        };
        //this.ngProgress.start();
        this.server.Api(logInfo).subscribe(
          (res) => {
            if (res["code"] == 1) {
              // this.toastr.success(res["message"], "Security center");
              let bag = res["token"];

              this.session.set("sessionID", bag);
              $("#close").click();

              this.route.navigate(["dashboard"]);
            }

            if (res["code"] == 2) {
              //  this.toastr.success(res["message"], "Security center");
              let bag = res["token"];
              this.session.set("adminID", bag);
              $("#close").click();
              this.route.navigate(["hkgjiinif684080ngi98084g06"]);
            }

            if (res["code"] == 3) {
              //  this.toastr.warning(res["message"], "Security center");
            } else {
              //   this.toastr.warning(res["message"], "Security center");
            }
            //    this.ngProgress.done();
          },
          () => {},
          () => {}
        );
      }
    } else {
    }
  }

  tog(e) {
    $(".main-menu").slideToggle(400);
  }
}
