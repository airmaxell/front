import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';
import { map, filter, scan, catchError} from 'rxjs/operators';
import { async } from 'q';
import { Deserialize } from 'cerialize';
import { Payload } from './payload';
import { Catcher } from './catcher';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public token: string;
  private userId: string;
  private url: string;

  constructor(private _httpClient: HttpClient, private _http: Http) { 
    // set token if saved in local storage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
    this.userId = currentUser && currentUser.id;
    this.url = 'http://api.catch-ai.com:8000/v1';
  }

  isUserLoggedin():Boolean {
    const user = localStorage.getItem('currentUser');
    if(user) {
      console.log("User logged in: " + user);
      return true;
    }
    return false;
  }

  login(userEmail: string, userPassword: string):Observable<JSON> {
      return this._httpClient.post(this.url + '/login', { "email": userEmail, "password": userPassword }, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
      .pipe(
        map((res: JSON) => {
          const response = JSON.parse(JSON.stringify(res));
          const token = response.token;
          const userId = response.user.id;
          if(token) {
            if(response.user.type == "user") {
              localStorage.setItem('currentUser', JSON.stringify({userEmail, token, userId}));
            }
            return response;
          } 
          return null;
        }, (err: HttpErrorResponse) => {
          const errorResponse = JSON.parse(JSON.stringify(err));
        })
      );
      // localStorage.setItem('currentUser', JSON.stringify({ userEmail, token }));
  }

  logout(): void {
      // clear token remove user from local storage to log user out
      this.token = null;
      localStorage.removeItem('currentUser');
  }

  getCatchers() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const id = user.userId;
    const token = user.token;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    };
    return this._httpClient.get(this.url + '/users/' + id + '/catchers', httpOptions);
  }

  getCatcher(catcherId: string):Observable<JSON> {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const token = user.token;
    const userId = user.userId;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    };
    return this._httpClient.get(this.url + "/users/" + userId + "/catchers/" + catcherId, httpOptions)
      .pipe(
        map((res: JSON)=>{
          return JSON.parse(JSON.stringify(res));
        })
      );
  }

  editCatcher(id, email, name) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const token = user.token;
    const userId = user.userId;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    };
    const body = {
      "email" : email,
      "name" : name
    }
    return this._httpClient.patch(this.url + "/users/" + userId + "/catchers/" + id, body, httpOptions)
    .pipe(
      map((res: JSON)=>{
        return JSON.parse(JSON.stringify(res));
      })
    );
  }

  deleteCatcher(catcherId: string) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const token = user.token;
    const userId = user.userId;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    };
    return this._httpClient.delete(this.url + "/users/" + userId + "/catchers/" + catcherId, httpOptions)
      .pipe(
        map((res: JSON)=>{
          return JSON.parse(JSON.stringify(res));
        })
      );
  }

  // User post new request
  postRequest(vin: string, withBackground: boolean, requestMessage: string, catcherId: string) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const token = user.token;
    const userId = user.userId;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    };

    const body = {
      "vin" : vin,
      "withBackground" : withBackground,
      "isAccepted" : false,
      "requestMessage" : requestMessage,
      "catcherId" : catcherId
    }
    console.log("TO SEND: " + JSON.stringify(body));
    return this._httpClient.post(this.url + "/users/" + userId + "/requests" , body , httpOptions);  
  }

  // User GET all requests
  getRequests() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const token = user.token;
    const id = user.userId;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token
      })
    };
    return this._httpClient.get(this.url + '/users/' + id + '/requests', httpOptions)
      .pipe(
        map((res: Array<any>)=>{
          return res;
        })
      );
  }

  // User post new request
  postCatcher(name: string, email: string, password: string) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const token = user.token;
    const userId = user.userId;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    };

    const body = {
      "name" : name,
      "email" : email,
      "password" : password
    }
    return this._httpClient.post(this.url + "/users/" + userId + "/catchers" , body , httpOptions);  
  }






  validateVin(vin): Promise<any> {
    let api:string = 'https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/';
    let format:string = '?format=json';
//NHTSA vin decoder API
    return this._http.get(api + vin + format)
               .toPromise()
//Deserialize JSON response to a typed object.
               .then(response => Deserialize(response.json().Results[0], Payload))
               .catch();
  }




}
