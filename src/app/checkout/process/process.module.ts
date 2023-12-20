import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BillComponent } from './bill/bill.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { PayComponent } from './pay/pay.component';
import { Bill2Component } from './bill-2/bill-2.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    BillComponent,
    DeliveryComponent,
    PayComponent,
    Bill2Component,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class ProcessModule { }
