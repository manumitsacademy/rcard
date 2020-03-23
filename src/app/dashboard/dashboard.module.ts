import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ShortcutsComponent } from './shortcuts/shortcuts.component';
import { AccountsummaryComponent } from './accountsummary/accountsummary.component';
import { MinistatementComponent } from './ministatement/ministatement.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [DashboardComponent, ShortcutsComponent, AccountsummaryComponent, MinistatementComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    HttpClientModule
  ]
})
export class DashboardModule { }