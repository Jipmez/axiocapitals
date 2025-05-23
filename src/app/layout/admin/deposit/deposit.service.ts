import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { DataService } from '../../../data.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { SessionStorageService } from 'angular-web-storage';
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class DepositService implements Resolve<any> {
  foo = 'rijij';
  user: any;
  cookieValue: string;
  path;
  constructor(
    private server: DataService,
    private cookieService: CookieService,
    public session: SessionStorageService,
    private httpClient: HttpClient
  ) {
    this.path = this.server.Getpath();
  }

  resolve(): Observable<any> {
    this.cookieValue = this.session.get('adminID');

    const dep = {
      key: 'admindep',
    };

    return this.httpClient.post(this.path, dep).pipe(
      map((dataFromApi) => dataFromApi),
      catchError((err) => Observable.throw(err.json().error))
    );
  }
}
