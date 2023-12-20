import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule, Title, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { CartModule } from './cart/cart.module';
import { CheckoutModule } from './checkout/checkout.module';
import { LoginModule } from './login/login.module';
import { ProductModule } from './product/product.module';
import { NotfoundComponent } from './notfound/notfound.component';
import { SharedModule } from './shared/shared.module';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    ProductModule,
    CartModule,
    CheckoutModule,
    LoginModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    HttpClient,
    provideClientHydration(),
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
