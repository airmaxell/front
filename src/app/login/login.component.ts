import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { ApiService } from '../shared/api.service';
import { NotificationsService } from 'angular2-notifications';
import { RouterModule, Routes } from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isError:Boolean = false;
  public options = {
    position: ["top", "right"],
    timeOut: 2500,
    lastOnBottom: false
  }

  constructor(private _httpClient:HttpClient, private _apiService: ApiService, private _router: Router, private _notificationService: NotificationsService) { }

  ngOnInit() {
    if(this._apiService.isUserLoggedin()) {
      this._router.navigate(['dashboard/']);
    }  
  }

  OnSubmit(userEmail, userPassword) {
    //console.log(" ------ " + userEmail + " : " + userPassword);
    this.isError = false;
    try {
      this._apiService.login(userEmail, userPassword).subscribe((response: JSON) => {
        if(response != null) {
          const res = JSON.parse(JSON.stringify(response));
          if(res.user.type == "user") {
            this._router.navigate(['dashboard/']);
          } else {
            this._notificationService.error('Error!', `You don't have permission to access!`);
          }
        } else {
          this._notificationService.error('Error!', `Bad user email/password!`);
        }
      },
      err=> {
        console.log("Catched Error: " + err.error);
        const errorResponse = JSON.parse(JSON.stringify(err));
        this._notificationService.error('Error!', errorResponse.error.message);
        console.log("Error Message: " + errorResponse.error.message);
      });
    } catch(error) {
      this._notificationService.error('Error!', `You don't have permission to access!`);
    }
    
  }

}
