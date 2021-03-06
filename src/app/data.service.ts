import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  path = 'http://localhost:3000/pictures';
  // json-server --watch db.json

  constructor(private http: HttpClient) { }

  getPictures() {
    return this.http.get(this.path).pipe(
      retry(3) // retry a failed request up to 3 times
    );
  }
}

