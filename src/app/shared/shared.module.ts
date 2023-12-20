import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { SammaryComponent } from './sammary/sammary.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { Order2Component } from './order2/order2.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    ProductCardComponent,
    SammaryComponent,
    HeaderComponent,
    Order2Component
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports:[
    NavbarComponent,
    FooterComponent,
    ProductCardComponent,
    SammaryComponent,
    HeaderComponent,
    Order2Component,
  ]
})
export class SharedModule { }
