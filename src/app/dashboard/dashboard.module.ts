import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ngx-bootstrap';

import { DashboardComponent } from './dashboard.component';
import { TopnavComponent } from '../shared/topnav/topnav.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { ManageRequestsComponent } from './manage-requests/manage-requests.component';
import { SentRequestsComponent } from './sent-requests/sent-requests.component';
import { SearchRequestsComponent } from './search-requests/search-requests.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 

import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ManageCatchersComponent } from './manage-catchers/manage-catchers.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, 
  MatSortModule, MatTableModule } from "@angular/material";
import { CatcherStatisticComponent } from './catcher-statistic/catcher-statistic.component';
import { RequestStatisticComponent } from './request-statistic/request-statistic.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TooltipModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    SimpleNotificationsModule.forRoot(),
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
  ],
  declarations: [DashboardComponent, TopnavComponent, SidebarComponent, ManageRequestsComponent, SentRequestsComponent, SearchRequestsComponent, ManageCatchersComponent, CatcherStatisticComponent, RequestStatisticComponent],
  exports: [DashboardComponent, TopnavComponent, SidebarComponent]
})
export class DashboardModule { }
