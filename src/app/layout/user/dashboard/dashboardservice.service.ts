import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { DataService } from '../../../data.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { SessionStorageService } from 'angular-web-storage';

@Injectable({
  providedIn: 'root',
})
export class DashboardserviceService implements Resolve<any> {
  foo = 'rijij';
  user: any;
  cookieValue: string;
  //  path: string = "http://localhost/street/baseApi.php";
  path;
  stock;
  constructor(
    private server: DataService,
    public session: SessionStorageService,

    private httpClient: HttpClient
  ) {
    this.path = this.server.Getpath();
    // this.stock = this.server.stockApi();
    this.cookieValue = this.session.get('sessionID');
  }

  resolve(): Observable<any> {
    let load = {
      val: this.cookieValue,
      key: 'load',
    };

    /* return this.httpClient.post(this.path, load).pipe(
      map(dataFromApi => dataFromApi),
      catchError(err => Observable.throw(err.json().error))
    );
  } */

    let me = {
      Id: this.cookieValue,
      key: 'user',
    };

    let promo = {
      Id: this.cookieValue,
      key: 'promo',
    };

    let ref = {
      val: this.cookieValue,
      key: 'reff',
    };

    let mte = {
      val: this.cookieValue,
      key: 'depN',
    };

    let upis = {
      Id: this.cookieValue,
      key: 'upi',
    };


    let allIn = {
      key: 'allIn',
    };

    return forkJoin([
      this.httpClient.post(this.path, load),
      this.httpClient.post(this.path, me),
      this.httpClient.post(this.path, promo),
      this.httpClient.post(this.path, ref),
      this.httpClient.post(this.path, mte),
      this.httpClient.post(this.path, allIn),
      this.httpClient.post(this.path, upis).catch((error) => {
        return Observable.throw(error);
      }),
    ]).map((result) => {
      return {
        types: result[0],
        dep: result[1],
        promo: result[2],
        ref: result[3],
        his: result[4],
        allIn: result[5],
        upi: result[6],
      };
    });
  }
}
