import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserCartService {
  private url = '/sweetApi';
  private token=this.loginService.getToken();

  // 用來下單
  private receiverName = '';
  private receiverPhone = '';
  private receiverAddress = '';
  // 用來實現同訂購地址
  private city = '';
  private district = '';
  private address = '';

  constructor(private http: HttpClient, private loginService:LoginService) {}

  // 取得使用者購物車
  public getUserCart() {
    return this.http.post(this.url + '/getUserCart', { token: this.token });
  }

  // 加入購物車
  public addUserCart(productId: number, orderQuantity: number) {
    return this.http
      .post(this.url + '/addUserCart', {
        token: this.token,
        productId: productId,
        orderQuantity: orderQuantity,
      })
      .pipe(
        // 成功加入商品後，更改currentCount
        // 這邊傳入null只是為了通知購物車數量發生了改變，實際的數字是由navbar的updateCartItemCount()做更改
        tap(() => {
          this.currentCount.next(null);
        })
      );
  }

  // 更新購物車
  public updateUserCart(productId: number, orderQuantity: number) {
    return this.http.post(this.url + '/updateUserCart', {
      token: this.token,
      productId: productId,
      orderQuantity: orderQuantity,
    });
  }

  // 驗證剩餘產品數量
  public batchUpdateUserCart(userCarts: Array<any>) {
    return this.http.post(this.url + '/batchUpdateUserCart', {
      token: this.token,
      userCarts: userCarts,
    });
  }

  // 刪除購物車
  public deleteUserCart( productId: number) {
    return this.http.post(this.url + '/deleteUserCart', {
      token: this.token,
      productId: productId,
    }).pipe(
      // 成功刪除商品後，更改currentCount
      // 這邊傳入null只是為了通知購物車數量發生了改變，實際的數字是由navbar做更改
      tap(() => {
        this.currentCount.next(null);
        this.clearCount.next();
      })
    );
  }

  // 結帳
  public checkoutUserCart() {
    return this.http
      .post(this.url + '/checkoutUserCart', {
        token: this.token,
        receiverName: this.receiverName,
        receiverPhone: this.receiverPhone,
        receiverAddress: this.receiverAddress,
      })
      .pipe(
        // 成功結帳後，更改currentCount
        tap(() => {
          this.clearCount.next();
        })
      );
  }

  // summary
  // BehaviorSubject是一个特殊的 Subject，始终保存着最新的值，并且在有新的subscribe时立即发送新的值。
  public deliveryFee = 200; //運費
  private currentSubTotal = new BehaviorSubject<number>(0); //小計
  // summary 動態更新小計、總計
  public subTotal$ = this.currentSubTotal.asObservable();
  public Total$ = this.subTotal$.pipe(map((subTotal) => subTotal + this.deliveryFee)); // RxJS的map() 將一個訂閱可以得到的資料轉換成另外一筆資料

  // cart-item 計算小計並更新
  public calculateAndUpdateSubTotal(userCartItem: any[]):void {
    if (!userCartItem || !Array.isArray(userCartItem)) { //如果userCartItem是空的或是不是陣列
      this.currentSubTotal.next(0);
      return;
    }
    //reduce 用來將多個值計算成一個值， acc 是累加器，一開始設為 0。item 是 userCartItem 陣列中的每一個元素。
    const newSubTotal = userCartItem.reduce(
      (acc, item) => acc + item[3] * item[1] , 0);
    this.currentSubTotal.next(newSubTotal);

  }

  // delivery
  // 儲存訂購地址
  public setDeliveryInfo(
    fullName: string,
    tel: string,
    city: string,
    district: string,
    address: string
  ) {
    this.receiverName = fullName;
    this.receiverPhone = tel;
    this.city = city;
    this.district = district;
    this.address = address;
    this.receiverAddress = city + ' ' + district + ' ' + address;
  }

  // bill-2
  // 取得訂購地址
  public getDeliveryAddress() {
    return {
      city: this.city,
      district: this.district,
      address: this.address,
    };
  }

  // nav
  // 更新購物車紅點、刪除購物車紅點
  // BehaviorSubject是一个特殊的 Subject，始终保存着最新的值，并且在有新的subscribe时立即发送新的值。
  // void | null 表示購物車狀態的不確定性，紅點點可能顯示，也可能不顯示
  public currentCount = new BehaviorSubject<void | null>(null);
  public clearCount = new Subject<void>();
}
