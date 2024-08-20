import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss'],
})
export class PromoComponent implements OnInit {
  promo: any;
  constructor(private server: DataService, private route: Router) {
    let promo = {
      key: 'promo',
    };
    this.server.Api(promo).subscribe((res) => {
      this.promo = res['message'][0]['status'];
      if (res['message'][0]['status'] == 0) {
        this.route.navigate(['']);
      }
    });
  }

  ngOnInit(): void {}
}
