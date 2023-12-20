import { Component } from '@angular/core';
import { UserCartService } from '../../@api/user-cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
})
export class CartItemComponent {
  public userCartItem: Array<any> = []; //購物車內的產品，原始
  public userCartObj: Array<any> = []; //購物車內的產品，轉換成obj

  constructor(
    private userCartService: UserCartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getUserCart();
  }

  // 取得購物車
  private getUserCart() {
    this.userCartService.getUserCart().subscribe(
      (data: any) => {
        this.userCartItem = data.data;
        console.log(this.userCartItem);
        // 計算並更新小計
        this.userCartService.calculateAndUpdateSubTotal(this.userCartItem);
        if (this.userCartItem) {
          // 把資料變成物件
          const userItemArray = [];
          for (let i = 0; i < this.userCartItem.length; i++) {
            const cartItem: any = {
              productID: this.userCartItem[i][0],
              orderQuantity: this.userCartItem[i][1],
              name: this.userCartItem[i][2],
              price: this.userCartItem[i][3],
              inventories: this.userCartItem[i][4],
              img: this.userCartItem[i][5],
            };
            userItemArray.push(cartItem);
          }
          // 把資料物件儲存到顯示陣列
          this.userCartObj = userItemArray;
        }else{
          this.userCartObj = [];
        }
      },
      (error) => {
        console.log(error.error);
        if (error.error.message === 'User status is expired') {
          alert('頁面逾時，請重新登入。');
          localStorage.removeItem('token');
          // 導向登入頁面
          this.router.navigateByUrl('/login');
        } else {
          alert(error.error.message);
        }
      }
    );
  }

  // 更新數量
  private updateUserCart(productId: number, orderQuantity: number) {
    this.userCartService.updateUserCart(productId, orderQuantity).subscribe(
      (data: any) => {
        // 更新成功重新加載購物車
        if (data.status === 200) {
          this.getUserCart();
        }
      },
      (error) => {
        console.log(error.error);
        if (error.error.message === 'Invalid quantity number') {
          alert('請輸入正確訂購數量，必須大於等於1');
        } else if (error.error.message === 'Order quantity exceeds inventory') {
          alert('超過庫存數量');
        }
        this.getUserCart();
      }
    );
  }

  // 刪除產品
  public deleteUserCart(productId: string) {
    const productIdToNumber = parseInt(productId);
    this.userCartService.deleteUserCart(productIdToNumber).subscribe(
      (data: any) => {
        // 刪除成功重新加載購物車
        this.getUserCart();
      },
      (error) => {
        console.log(error.error);
      }
    );
  }

  // button -
  public decrementQuantity(item: any) {
    this.updateUserCart(item.productID, Number(item.orderQuantity) - 1);
  }

  // button +
  public incrementQuantity(item: any) {
    this.updateUserCart(item.productID, Number(item.orderQuantity) + 1);
  }

  // 直接更改
  public changeQuantity(productId: number, orderQuantity: string) {
    const orderComponentToNumber = parseInt(orderQuantity);
    this.updateUserCart(productId, orderComponentToNumber);
  }
}
