import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { DataService } from '../../../data.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { SessionStorageService } from 'angular-web-storage';

@Injectable({
  providedIn: 'root',
})
export class ContentService implements Resolve<any> {
  foo = 'rijij';
  user: any;
  cookieValue: string;
  path;
  constructor(
    public session: SessionStorageService,
    private server: DataService,
    private cookieService: CookieService,
    private httpClient: HttpClient
  ) {
    this.path = this.server.Getpath();
  }

  resolve(): Observable<any> {
    this.cookieValue = this.session.get('sessionID');

    let getU = {
      key: 'allU',
    };

    return forkJoin([
      this.httpClient.post(this.path, getU).catch((error) => {
        /* if(error.status === 404) {
              this.router.navigate(['subscription-create']);
          } */

        return Observable.throw(error);
      }),
    ]).map((result) => {
      console.log(result);
      return {
        users: result[0],
      };
    });

    /*  return this.httpClient.post(this.path, load).pipe(
      map(dataFromApi => dataFromApi),
      catchError(err => Observable.throw(err.json().error))
    ); */
  }
}
