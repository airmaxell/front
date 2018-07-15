import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-statistic',
  templateUrl: './request-statistic.component.html',
  styleUrls: ['./request-statistic.component.scss']
})
export class RequestStatisticComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

}
