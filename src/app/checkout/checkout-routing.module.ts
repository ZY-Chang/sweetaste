import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { SuccessComponent } from './success/success.component';
import { ProcessComponent } from './process/process.component';
import { PayComponent } from './process/pay/pay.component';
import { DeliveryComponent } from './process/delivery/delivery.component';
import { BillComponent } from './process/bill/bill.component';
import { Bill2Component } from './process/bill-2/bill-2.component';

const routes: Routes = [
  {
    path: '',
    component: CheckoutComponent,
    children: [
      { path: '', redirectTo: 'process', pathMatch: 'full' },
      { path: 'success', component: SuccessComponent },
      {
        path: 'process',
        component: ProcessComponent,
        children: [
          { path: '', redirectTo: 'delivery', pathMatch: 'full' },
          { path: 'delivery', component: DeliveryComponent },
          { path: 'pay', component: PayComponent },
          { path: 'bill-1', component: BillComponent },
          { path: 'bill-2', component: Bill2Component },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes ,{ useHash: true })],
  exports: [RouterModule],
})
export class CheckoutRoutingModule {}
