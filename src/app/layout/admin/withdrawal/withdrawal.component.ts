import {
  Component,
  OnInit,
  ViewContainerRef,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
} from "@angular/core";
import { SessionStorageService } from "angular-web-storage";
import { DataService } from "../../../data.service";
import { Router, ActivatedRoute } from "@angular/router";

import { ToastrManager } from "ng6-toastr-notifications";

declare let $;
@Component({
  selector: "app-withdrawal",
  templateUrl: "./withdrawal.component.html",
  styleUrls: ["./withdrawal.component.scss"],
})
export class WithdrawalComponent implements OnInit {
  @ViewChild("dataTable") table: ElementRef;
  dataTable: any;

  constructor(
    private server: DataService,
    private chRef: ChangeDetectorRef,
    private session: SessionStorageService,
    private route: Router,
    private activate: ActivatedRoute,
    private toastr: ToastrManager,
    vcr: ViewContainerRef
  ) {
    $("meta[name=viewport]").attr(
      "content",
      "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    );

    $("#tog").click();
  }
  withdraw;
  q: number;
  ngOnInit() {
    let data = this.activate.snapshot.data;
    this.withdraw = data["withconfirm"]["withdrawals"];
    this.chRef.detectChanges();
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.dataTable({
      responsive: true,
    });
  }

  select(deposits) {
    this.session.set("withB", deposits.withdrawId);
    this.route.navigate([
      "hkgjiinif684080ngi98084g06/proid",
      deposits.profileid,
    ]);
  }

  deleteWith(x) {
    let payload = {
      withdrawId: x,
      key: "withdrawId",
    };

    this.server.Api(payload).subscribe(
      (res) => {
        if (res["code"] == 1) {
          this.toastr.successToastr(res["message"]);
          let v = document.getElementById(x);
          $(v).remove();
        }
      },
      () => {},
      () => {}
    );
  }
}
