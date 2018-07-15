import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catcher-statistic',
  templateUrl: './catcher-statistic.component.html',
  styleUrls: ['./catcher-statistic.component.scss']
})
export class CatcherStatisticComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

}
