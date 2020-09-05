import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MigrateMessage } from './migrate-message.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: align
  migrateMessages(hostUrl: string, sourceToken: string, targetToken: string, waitTime: number, csvFile: File): Promise<any> {
    const reqData = {
      hostUrl,
      sourceToken,
      targetToken,
      waitTime,
      csvFile
    };
    return this.http.post<{message: string, migrateMessage: MigrateMessage}>(
      'http://localhost:3000/api/migrateMessages',
        reqData
       ).toPromise().then(response => response);
      // .subscribe((response) => {
      //   return response;
      // });
  }
}
