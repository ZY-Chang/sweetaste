import { UserCartService } from './../@api/user-cart.service';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LoginService } from '../@api/login.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent {
  private isLogin: boolean= this.loginService.isLogin()

  constructor(
    private titleService: Title,
    private router: Router,
    private userCartService: UserCartService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.titleService.setTitle('六角甜點工房-購物車');
    // 判斷是否登入
    if (!this.isLogin) {
      alert('請先登入');
      this.router.navigateByUrl('/login');
    }
  }

  // 結帳
  public checkout() {
    this.userCartService.getUserCart().subscribe((data: any) => {
      if (data.data) {
        // 把資料篩選出來，以執行 batchUpdateUserCart
        let batchItem: Array<any> = [];
        batchItem = (data.data as Array<any>).map((item) => ({
          productId: parseInt(item[0]),
          orderQuantity: parseInt(item[1]),
        }));
        // 執行batchUpdateUserCart
        this.userCartService
          .batchUpdateUserCart(batchItem)
          .subscribe(
            () => {
              // 沒問題就導航到下一步
              this.router.navigateByUrl('/checkout/process/delivery');
            },
            (error) => {
              // 有問題，切出錯誤商品代碼
              const errorId = error.error.message.split(':')[0];
              // 對比errorId和data.data裡面的資料，找出產品名稱
              const errorItem = data.data.find((e:any) => {
                return Number(e[0]) === Number(errorId);
              });
              alert(" 產品： "+errorItem[2]+" 庫存數量不足");
            }
          );
      } else {
        alert('您的購物車沒有東西');
      }
    });
  }
}
