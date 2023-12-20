import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './notfound/notfound.component';
import { ProductComponent } from './product/product.component';

// 使用延遲載入的路由
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home-routing.module').then((m) => m.HomeRoutingModule),
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./product/product-routing.module').then(
        (m) => m.ProductRoutingModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login-routing.module').then((m) => m.LoginRoutingModule),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./cart/cart-routing.module').then((m) => m.CartRoutingModule),
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./checkout/checkout-routing.module').then((m) => m.CheckoutRoutingModule),
  },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes ,{ useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

// 原本的路由檔案
// const routes: Routes = [
//   { path: '', redirectTo: '/home', pathMatch: 'full' },
//   { path: 'home', component: HomeComponent },
//   { path: 'product', component: ProductComponent },
//   { path: 'login', component: LoginComponent },
//   { path: 'cart', component: CartComponent },
//   {
//     path: 'checkout',
//     component: CheckoutComponent,
//     children: [
//       { path: '', redirectTo: 'process', pathMatch: 'full' },
//       { path: 'success', component: SuccessComponent },
//       {
//         path: 'process',
//         component: ProcessComponent,
//         children: [
//           { path: '', redirectTo: 'delivery', pathMatch: 'full' },
//           { path: 'delivery', component: DeliveryComponent },
//           { path: 'pay', component: PayComponent },
//           { path: 'bill-1', component: BillComponent },
//           { path: 'bill-2', component: Bill2Component },
//         ],
//       },
//     ],
//   },
//   { path: '**', component: NotfoundComponent },
// ];
