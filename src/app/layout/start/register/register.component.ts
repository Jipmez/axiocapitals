import { Component, OnInit, Inject } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { NgForm } from "@angular/forms";
import { ToastrManager } from "ng6-toastr-notifications";
import { DataService } from "../../../data.service";
import { Router, ActivatedRoute } from "@angular/router";

declare let $;
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  login = [];
  order: any;
  captcha = new Array();
  constructor(
    private server: DataService,
    private toastr: ToastrManager,

    public cookieService: CookieService,
    private route: Router,
    private router: ActivatedRoute
  ) {
    $("meta[name=viewport]").attr("content", "width=device-width");

    for (let q = 0; q < 6; q++) {
      if (q % 2 == 0) {
        this.captcha[q] = Math.floor(Math.random() * 6);
      } else {
        this.captcha[q] = Math.floor(Math.random() * 10 + 0);
      }
    }
  }

  ngOnInit() {
    var element = document.getElementById("na");
    element.classList.remove("mobile-menu-visible");

    this.router.queryParams
      .filter((params) => params.ref)
      .subscribe((params) => {
        console.log(params); // {order: "popular"}

        this.order = params.ref;
        console.log(this.order); // popular
      });

    $(".toggle-password").click(function () {
      $(this).toggleClass("fa-eye fa-eye-slash");
      var input = $("#id_pass");
      if (input.attr("type") == "password") {
        input.attr("type", "text");
      } else {
        input.attr("type", "password");
      }
    });
  }

  show() {
    $(".toggle-pasword").toggleClass("fa-eye fa-eye-slash");
    var input = $("#c_pass");
    if (input.attr("type") == "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
  }

  /*  analyzeFullname(x) {
    if (x.length < 2) {
      document.getElementById('id_full').style.borderBottom = '2px solid red';
    } else {
      document.getElementById('id_full').style.borderBottom = '2px solid green';
    }
  } */

  analyzeUsername(x) {
    var nameRe = /^[A-Z \'.-]{2,40}$/i;
    if (!x.match(nameRe)) {
      document.getElementById("id_user").style.borderBottom = "2px solid red";
    } else {
      document.getElementById("id_user").style.borderBottom = "2px solid green";
    }
  }

  checkAdress(x) {
    if (x.length < 2) {
      document.getElementById("id_add").style.borderBottom = "2px solid red";
    } else {
      document.getElementById("id_add").style.borderBottom = "2px solid green";
    }
  }

  checkMail(x) {
    var strongEmail = /^.+@.+..{2,4}$/;

    if (x.match(strongEmail)) {
      document.getElementById("id_email").style.borderBottom =
        "2px solid green";
    } else {
      document.getElementById("id_email").style.borderBottom = "2px solid red";
    }
  }

  analyze(x) {
    var strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    var mediumRegex = new RegExp(
      "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
    );
    if (strongRegex.test(x)) {
      document.getElementById("id_pass").style.borderBottom = "2px solid green";
    } else if (mediumRegex.test(x)) {
      document.getElementById("id_pass").style.borderBottom =
        "2px solid orange";
    } else {
      document.getElementById("id_pass").style.borderBottom = "2px solid red";
    }
  }

  Reg(x: NgForm) {
    if (!x.value.captcha.match(this.captcha.join(""))) {
      return this.toastr.warningToastr("invalid Captcha");
    }

    var nameRe = /^[A-Z \'.-]{2,40}$/i;
    var emailRe = /^.+@.+\..{2,4}$/;

    if (!x.value.email.match(emailRe)) {
      this.toastr.errorToastr("Please input a correct email");
    }

    if (!x.value.username.match(nameRe)) {
      this.toastr.errorToastr("Username error");
    }
    /*
    if (x.value.password === x.value.cpass) {
      var password = x.value.password;
    } else {
      this.toastr.errorToastr('incorrect password match');
    } */

    if (x.value.email.match(emailRe) && x.value.username.match(nameRe)) {
      let comingUser = [x.value.username, x.value.email, x.value.password];
      let err = ["fullname", "username", "email", "password"];
      let p = 0;
      let count = 0;

      while (p < comingUser.length) {
        if (comingUser[p].length < 2) {
          this.toastr.errorToastr(err[p] + "should be more than two letters");
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
            // bitcoin: x.value.bitcoin,
            country: x.value.country,
            key: "reg",
          };
          this.toastr.successToastr("Creating Account");
          this.server.Api(msg).subscribe(
            (res) => {
              if (res["code"] == "1") {
                this.toastr.successToastr("Account created successfully");
                if (this.login.push("me")) {
                  this.route.navigate(["/login"]);
                }
              } else {
                this.toastr.infoToastr(res["message"]);
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
            //bitcoin: x.value.bitcoin,
            country: x.value.country,
            ref: this.order,
            key: "regref",
          };
          this.toastr.successToastr("Creating Account");

          this.server.Api(msg).subscribe(
            (res) => {
              if (res["code"] == "1") {
                this.toastr.successToastr("Account created successfully");
                if (this.login.push("me")) {
                  this.route.navigate(["/login"]);
                }
              } else {
                this.toastr.infoToastr(res["message"]);
              }
            },
            () => {

            },
            () => {

            }
          );
        }
      }
    }
  }

  tog() {
    $("#met").toggleClass("show");
  }
}
