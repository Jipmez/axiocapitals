import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { DataService } from '../../../data.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs/observable/forkJoin';
import {
  LocalStorageService,
  SessionStorageService,
  LocalStorage,
  SessionStorage,
} from 'angular-web-storage';

@Injectable({
  providedIn: 'root',
})
export class DashcontentserviceService implements Resolve<any> {
  foo = 'rijij';
  user: any;
  cookieValue: string;
  path;
  constructor(
    public session: SessionStorageService,
    private server: DataService,
    private httpClient: HttpClient
  ) {
    this.path = this.server.Getpath();
  }

  resolve(): Observable<any> {
    this.cookieValue = this.session.get('sessionID');

    let load = {
      val: this.cookieValue,
      key: 'load',
    };

    let me = {
      Id: this.cookieValue,
      key: 'user',
    };

    let mte = {
      val: this.cookieValue,
      key: 'depN',
    };

    let upi = {
      Id: this.cookieValue,
      key: 'upi',
    };

    return forkJoin([
      this.httpClient.post(this.path, load),
      this.httpClient.post(this.path, me),
      this.httpClient.post(this.path, mte),
      this.httpClient.post(this.path, upi).catch((error) => {
        /* if(error.status === 404) {
              this.router.navigate(['subscription-create']);
          } */

        return Observable.throw(error);
      }),
    ]).map((result) => {
      return {
        types: result[0],
        dep: result[1],
        his: result[2],
        upi: result[3],
      };
    });

    /*  return this.httpClient.post(this.path, load).pipe(
      map(dataFromApi => dataFromApi),
      catchError(err => Observable.throw(err.json().error))
    ); */
  }
}
