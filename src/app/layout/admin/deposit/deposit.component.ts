import {
  Component,
  OnInit,
  ViewContainerRef,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from "@angular/core";
import { SessionStorageService } from "angular-web-storage";
import { NgForm } from "@angular/forms";
import { DataService } from "../../../data.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrManager } from "ng6-toastr-notifications";
declare let $;
@Component({
  selector: "app-deposit",
  templateUrl: "./deposit.component.html",
  styleUrls: ["./deposit.component.scss"],
})
export class DepositComponent implements OnInit {
  @ViewChild("dataTable") table: ElementRef;
  dataTable: any;

  deposit;
  q: number;
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
  }

  ngOnInit() {
    let data = this.activate.snapshot.data;
    this.deposit = data["depconfirm"]["deposits"];
    this.chRef.detectChanges();
    this.dataTable = $(this.table.nativeElement);
    this.dataTable.dataTable({
      responsive: true,
      order: [[0, "desc"]],
    });
  }

  select(deposits) {
    this.session.set("depoU", deposits.deposite_id);

    this.route.navigate([
      "hkgjiinif684080ngi98084g06/proid",
      deposits.profileId,
    ]);
  }

  confirm(x) {
    const payload = {
      depositId: x,
      key: "depositId",
    };

    this.server.Api(payload).subscribe(
      (res) => {
        console.log(res);
      },
      () => {},
      () => {}
    );
  }

  deleteDep(x) {
    const payload = {
      deleteId: x,
      key: "deleteDep",
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
