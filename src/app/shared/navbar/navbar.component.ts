import { UserCartService } from './../../@api/user-cart.service';
import { Component } from '@angular/core';
import { LoginService } from '../../@api/login.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  public cartItemCount: number = 0; // 購物車數量
  public isShowCartIcon: boolean = false; //是否顯示購物車
  constructor(
    private loginService: LoginService,
    private router: Router,
    private userCartService: UserCartService
  ) {}

  ngOnInit() {
    // 初始化紅點數量
    this.updateCartItemCount();
    // 動態更新紅點數量
    this.userCartService.currentCount.subscribe(() => {
      this.updateCartItemCount();
    });

    // 訂閱路由事件，檢查是否在 home product
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.router.url;
        this.isShowCartIcon =
          currentRoute.includes('/home') ||
          currentRoute.includes('/product') ||
          currentRoute.includes('/login');
      }
    });

    // 清除紅點的事件
    this.userCartService.clearCount.subscribe(() => {
      this.cartItemCount = 0;
    });
  }

  // 取得登入狀態
  public get isLogin() {
    //  !!強制轉換 null、undefined 或空字串都會變成false
    if(typeof localStorage !== 'undefined'){
      return !!localStorage.getItem('token');
    }else{
      return false;
    }
  }

  // 登出
  public logout() {
    this.loginService.logout();
    // 紅點設為0
    this.cartItemCount = 0;
    alert('登出成功');
    this.router.navigateByUrl('/home');
  }

  // 購物車項目數量
  private updateCartItemCount() {
    const token = this.loginService.getToken();
    if (token) {
      this.userCartService.getUserCart().subscribe((data: any) => {
        // 更新購物車項目數量
        if (data && data.data) {
          this.cartItemCount = data.data.length;
        }
      });
    }
  }
}
