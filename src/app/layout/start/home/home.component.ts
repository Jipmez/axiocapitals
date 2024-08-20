import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { DataService } from '../../../data.service';
import { DOCUMENT } from '@angular/common';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgForm } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
declare var $;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  deposit = [];
  withdraw = [];
  dep: any;
  with: any;
  user: any;
  promo: any;
  $crisp: any;
  constructor(
    private server: DataService,
    private toastr: ToastrManager,
    public cookieService: CookieService,
    private route: Router,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document
  ) {}

  myStyle: object = {};
  myParams: object = {};

  ngOnInit(): void {
    let promo = {
      key: 'promo',
    };
    this.server.Api(promo).subscribe((res) => {
      this.promo = res['message'][0]['status'];
    });

    let user = {
      key: 'invest',
    };
    this.server.Api(user).subscribe(
      (res) => {
        console.log(res);
        if ((res['code'] = 1)) {
          this.deposit = res['message'][0];
          this.withdraw = res['message'][1];
          this.dep = res['dep'];
          this.with = res['with'];
          this.user = res['user'];
        }
      },
      () => {},
      () => {}
    );

    this.myStyle = {
      position: 'relative',
      width: '100%',
      height: '100%',
      /*  "z-index": 1, */
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    };

    this.myParams = {
      particles: {
        number: {
          value: 150,
        },
        color: {
          value: '#FFD400',
        },
        shape: {
          type: 'edge',
        },
      },
    };
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 100,
    autoplay: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };

  ngAfterViewInit() {
    //   new TradingView.widget({
    //      'container_id': 'technical-analysis',
    //      'autosize': true,
    //      'symbol': "NASDAQ:AAPL",
    //      'interval': '120',
    //      'timezone': 'exchange',
    //      'theme': 'Dark',
    //      'style': '1',
    //      'toolbar_bg': '#f1f3f6',
    //      'withdateranges': true,
    //      'hide_side_toolbar': false,
    //      'allow_symbol_change': true,
    //      'save_image': false,
    //      'hideideas': true,
    //      'studies': [
    //      'MASimple@tv-basicstudies' ],
    //      'show_popup_button': true,
    //      'popup_width': '1000',
    //      'popup_height': '650'
    //    });
    // const s = this._renderer2.createElement('script');
    // s.type = 'text/javascript';
    // s.src =
    //   'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    // let me = {
    //   symbols: [
    //     {
    //       proName: 'OANDA:SPX500USD',
    //       title: 'S&P 500',
    //     },
    //     {
    //       proName: 'OANDA:NAS100USD',
    //       title: 'Nasdaq 100',
    //     },
    //     {
    //       proName: 'FX_IDC:EURUSD',
    //       title: 'EUR/USD',
    //     },
    //     {
    //       proName: 'BITSTAMP:BTCUSD',
    //       title: 'BTC/USD',
    //     },
    //     {
    //       proName: 'BITSTAMP:ETHUSD',
    //       title: 'ETH/USD',
    //     },
    //   ],
    //   colorTheme: 'light',
    //   isTransparent: false,
    //   displayMode: 'adaptive',
    //   locale: 'en',
    // };
    // this._renderer2.appendChild(this._document.getElementById('sage'), s);
  }

  plan(plan, amount, earn) {
    let p = {
      plan: plan,
      amount: amount,
      earn: earn,
    };
    let set = localStorage.setItem('plan', JSON.stringify(p));

    this.route.navigate(['/signup']);
  }

  nav() {
    localStorage.removeItem('plan');
    this.route.navigate(['/signup']);
  }

  messageUs(x: NgForm) {
    const nameRe = /^[A-Z \'.-]{2,40}$/i;
    const emailRe = /^.+@.+\..{2,4}$/;
    if (x.value.email.match(emailRe) && x.value.name.match(nameRe)) {
      let message = {
        name: x.value.name,
        email: x.value.email,
        text: x.value.message,
        key: 'contactus',
      };
      this.server.Api(message).subscribe((res) => {
        this.toastr.infoToastr(res['message'], 'Security Center');
        x.reset();
      });
    }
  }
}
