import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    './dashboard.component.scss'
  ]
})
export class DashboardComponent implements OnInit {

  constructor(private _apiService: ApiService, private _router:Router) { }

  ngOnInit() {
    if(!this._apiService.isUserLoggedin()) {
      this._router.navigate(['']);
    }
    
  }

  logout() {
    this._apiService.logout();
    this._router.navigate(['']);
  }

}
