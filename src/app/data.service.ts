import { Injectable, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import 'rxjs/Rx';
import { SessionStorageService } from 'angular-web-storage';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  _document: any;
  constructor(
    private serviceBoy: HttpClient,
    public session: SessionStorageService,
    private nav: Router
  ) {}
  Coinpath: string = 'https://frontstandonline.com/streetits/generate.php';
  path: string = 'https://frontstandonline.com/street/baseApi.php';
  stock: string =
    'https://financialmodelingprep.com/api/v3/profile/AAPL,YELP?apikey=78860d8e8216c2d4c543065759b604de';

  Api(x) {
    return this.serviceBoy.post(this.path, x);
  }

  Pay(x) {
    return this.serviceBoy.post(this.Coinpath, x);
  }

  Sms(x, h) {
    return this.serviceBoy.post(
      'https://d7sms.p.rapidapi.com/secure/send',
      x,
      h
    );
  }

  getStock() {
    return this.serviceBoy.get(this.stock);
  }
  Getpath() {
    return this.path;
  }

  stockApi() {
    return this.stock;
  }

  CheckLogin() {
    if (this.session.get('sessionID')) {
      return true;
    } else {
      this.nav.navigate(['']);
    }
  }

  get isLoggedIn(): boolean {
    let authToken = this.session.get('sessionID');
    return authToken !== null ? true : false;
  }

  logOut() {
    let id = this.session.get('sessionID');
    if (id) {
      this.session.remove('sessionID');
      if (this.session.get('sessionID') == null) {
        this.nav.navigate(['']);
      }
    }
  }

  AlogOut() {
    let id = this.session.get('adminID');
    if (id) {
      this.session.remove('adminID');
      if (this.session.get('adminID') == null) {
        this.nav.navigate(['']);
      }
    }
  }

  public render(renderer2: Renderer2, path: string, _document: Document): void {
    let x = renderer2.createElement('script');
    x.type = 'text/javascript';
    //script.text = `${JSON.stringify(data)}`;
    x.src = path;
    renderer2.appendChild(_document.body, x);
  }
}
