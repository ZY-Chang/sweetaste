import { UserCartService } from './../@api/user-cart.service';
import { LoginService } from './../@api/login.service';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  // 登入
  public username: string = '';
  public password: string = '';
  public errorMessage: string = '';
  // 註冊
  public registerUsername: string = '';
  public registerPassword: string = '';
  public registerErrorMessage: string = '';

  constructor(
    private titleService: Title,
    private loginService: LoginService,
    private userCartService:UserCartService,
    private router: Router
  ) {}

  ngOnInit() {
    // 網頁標題
    this.titleService.setTitle('六角甜點工房-登入');
    // 取出記住我
    this.rememberMe=this.loginService.getRememberMe();
    // 取出帳號
    this.username=this.loginService.getAccout();
  }

  // 登入
  public login() {
    this.loginService.login(this.username, this.password).subscribe(
      (data: any) => {
        // 登入成功
        alert("登入成功")
        // 在登入成功後，觸發紅點點的更新
        this.userCartService.currentCount.next();
        // 導向產品頁面
        this.router.navigateByUrl("/product");
        // 確認是否要記住帳號
        this.loginService.setAccount(this.username);
      },
      (error) => {
        // 登入失敗
        this.errorMessage = error.error.message;
      }
    );
  }

  // 註冊
  public checkUserExist() {
    this.loginService
      .checkUserExist(this.registerUsername)
      .subscribe((data: any) => {
        // 確認使用者是否存在
        if (data.data) {
          this.registerErrorMessage = '該帳號已被註冊過';
        } else {
          // 註冊新帳號
          this.registerErrorMessage = '';
          this.loginService
            .register(this.registerUsername, this.registerPassword)
            .subscribe((data: any) => {
              console.log(data);
              alert('註冊成功，請重新登入');
              // 關閉Modal
              $('#exampleModal').modal('hide');
              this.router.navigateByUrl('/login');
            });
        }
      });
  }

  // 記住我
  public rememberMe=false;
  public changeRememberMe(){
    this.rememberMe = !this.rememberMe;
    this.loginService.setRemenberMe(this.rememberMe);
  }

}
