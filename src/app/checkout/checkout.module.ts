import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SuccessComponent } from './success/success.component';
import { ProcessComponent } from './process/process.component';
import { ProcessModule } from './process/process.module';
import { CheckoutComponent } from './checkout.component';



@NgModule({
  declarations: [
    SuccessComponent,
    ProcessComponent,
    CheckoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ProcessModule
  ]
})
export class CheckoutModule { }
