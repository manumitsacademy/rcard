import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionhistoryRoutingModule } from './transactionhistory-routing.module';
import { TransactionhistoryComponent } from './transactionhistory.component';


@NgModule({
  declarations: [TransactionhistoryComponent],
  imports: [
    CommonModule,
    TransactionhistoryRoutingModule
  ]
})
export class TransactionhistoryModule { }
