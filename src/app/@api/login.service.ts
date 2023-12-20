import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url="/sweetApi";

  constructor(private http:HttpClient) { }

  // 登入
  public login(username: string, password: string) {
    return this.http.post( this.url + '/login',{"username" : username , "password" : password})
    .pipe(
      // 使用 tap 處理登入成功的邏輯，tap可以攔截 observable 的資料流，並對其進行處理，而不改變資料本身
      tap((data: any) => {
        // 儲存 token
        this.setToken(data.data);
      })
    );
  }

  // 登出
  public logout() {
    localStorage.removeItem('token');
  }

  // 確認使用者是否存在
  public checkUserExist(username :string){
    return this.http.post(this.url + '/checkUserExist',{"username" : username })
  }
  // 註冊
  public register(username : string , password : string ){
    return this.http.post(this.url + '/register',{"username" : username , "password" : password})
  }

  // 儲存token
  private setToken(token: string) {
    localStorage.setItem('token', token);
  }

   // 判斷是否登入 或是 取得 token
   public getToken() : string | null{
    return typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
  }

  public isLogin() : boolean{
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('token') : null;
    return token ? true : false;
  }

  // 儲存記住我
  public setRemenberMe(rememberMe:boolean){
    localStorage.setItem("rememberMe", JSON.stringify(rememberMe));
  }

  // 取得記住我
  public getRememberMe():boolean{
    // 先把localstorage取出來才能轉換型別
    const rememberMeString = typeof localStorage !== 'undefined' ? localStorage.getItem("rememberMe") : null;
    const rememberMe = rememberMeString ? JSON.parse(rememberMeString) : null;
    return typeof rememberMe === 'boolean' ? rememberMe : false;
  }

  // 儲存帳號
  public setAccount(account: string) {
    const rememberMe = this.getRememberMe();
    if (rememberMe) {
      localStorage.setItem("account", account);
    } else {
      localStorage.removeItem("account");
    }
  }

  // 取得帳號
  public getAccout():string {
    const storedAccount = typeof localStorage !== 'undefined' ? localStorage.getItem('account') : null;
    return storedAccount ? storedAccount : "" ;
  }
}
