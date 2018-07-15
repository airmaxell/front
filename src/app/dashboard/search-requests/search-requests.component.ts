import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-requests',
  templateUrl: './search-requests.component.html',
  styleUrls: ['./search-requests.component.scss']
})
export class SearchRequestsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

}
