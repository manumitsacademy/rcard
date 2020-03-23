import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { DashboardhomeComponent } from './dashboardhome/dashboardhome.component';
import { TransactionhistoryComponent } from './transactionhistory/transactionhistory.component';

const routes: Routes = [{ path: '', component: DashboardComponent,children:[
        {
          path:'',component:DashboardhomeComponent
        },
        {
          path:'transactionhistory',
          component:TransactionhistoryComponent
        }
      ]
     }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
