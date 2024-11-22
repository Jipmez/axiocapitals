import { Component, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { NgForm } from "@angular/forms";
import { ToastrManager } from "ng6-toastr-notifications";
import { DataService } from "../../../data.service";
import { ActivatedRoute, Router } from "@angular/router";
import { SessionStorageService } from "angular-web-storage";

declare let $;
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  order: any;
  code: any;

  captcha = new Array();
  constructor(
    private server: DataService,
    private routte: ActivatedRoute,
    private toastr: ToastrManager,
    public cookieService: CookieService,
    public session: SessionStorageService,
    private route: Router
  ) {
    $("meta[name=viewport]").attr("content", "width=device-width");

    for (let q = 0; q < 6; q++) {
      if (q % 2 == 0) {
        this.captcha[q] = String.fromCharCode(
          Math.floor(Math.random() * 26 + 65)
        );
      } else {
        this.captcha[q] = Math.floor(Math.random() * 10 + 0);
      }
    }
  }

  ngOnInit() {
    var element = document.getElementById("na");
    element.classList.remove("mobile-menu-visible");

    $(".toggle-password").click(function () {
      $(this).toggleClass("fa-eye fa-eye-slash");
      var input = $("#me");
      if (input.attr("type") == "password") {
        input.attr("type", "text");
      } else {
        input.attr("type", "password");
      }
    });
    this.routte.queryParams
      .filter((params) => params.hash)
      .subscribe((params) => {
        console.log(params); // {order: "popular"}

        this.order = params.hash;
        console.log(this.order); // popular
      });

    if (this.order) {
      let confirm = {
        hash: this.order,
        key: "mailconfirm",
      };
      this.server.Api(confirm).subscribe((res) => {
        this.code = res["code"];
      });
    }
  }

  store() {
    //this.cookieService.set("eiee", "me");
    this.session.set("sessionID", "iiiuieui");
  }

  deletet() {
    this.session.remove("sessionID");
  }

  getet() {
    let me = this.session.get("sessionID");
    console.log(me);
  }

  logIn(x: NgForm) {
    /*     if (!x.value.captcha.match(this.captcha.join(""))) {
      return this.toastr.warningToastr("invalid Captcha");
    } */
    var emailRe = /^.+@.+\..{2,4}$/;

    if (x.value.email.match(emailRe)) {
      let comingUser = [x.value.email, x.value.password];

      let err = ["email", "wiwoo"];

      let p = 0;
      let count = 0;

      while (p < comingUser.length) {
        if (comingUser[p].length < 4) {
          this.toastr.warningToastr(err[p] + "is empty");
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

        this.server.Api(logInfo).subscribe(
          (res) => {
            if (res["code"] == 1) {
              this.toastr.successToastr(res["message"], "Security center");
              let bag = res["token"];
              this.session.set("sessionID", bag);
              // this.cookieService.set("logID", bag);
              this.route.navigate(["onboarding"]);
            }

            if (res["code"] == 2) {
              this.toastr.successToastr(
                res["message"],
                "Redirecting to dashboard"
              );
              let bag = res["token"];
              this.session.set("adminID", bag);
              this.route.navigate(["hkgjiinif684080ngi98084g06"]);
            }

            if (res["code"] == 3) {
              this.toastr.warningToastr(res["message"], "Security center");
            }

          },
          () => {},
          () => {}
        );
      }
    } else {
    }
  }
}
