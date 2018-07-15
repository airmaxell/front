import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ManageRequestsRoutes } from './manage-requests/manage-requests.routes';
import { SentRequestsRoutes } from './sent-requests/sent-requests.routes';
import { SearchRequestsRoutes } from './search-requests/search-requests.routes';
import { ManageCatchersRoutes } from './manage-catchers/manage-catchers.routes';
import { CatcherStatisticRoutes } from './catcher-statistic/catcher-statistic.routes';
import { RequestStatisticRoutes } from './request-statistic/request-statistic.routes';

export const DashboardRoutes: Routes = [
    {
      path: 'dashboard',
      component: DashboardComponent,
      children: [
        ...ManageRequestsRoutes,
        ...SentRequestsRoutes,
        ...SearchRequestsRoutes,
        ...ManageCatchersRoutes,
        ...CatcherStatisticRoutes,
        ...RequestStatisticRoutes
      ]
    }
];
