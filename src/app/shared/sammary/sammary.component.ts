import { UserCartService } from './../../@api/user-cart.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sammary',
  templateUrl: './sammary.component.html',
})
export class SammaryComponent  {
  public subTotal:number=0; //小計
  public total:number=0; //總計
  public deliveryFee=this.userCartService.deliveryFee; //運費

  public currentUrl : string=""; //網址

  constructor(private router: Router, private userCartService:UserCartService) {}

  // 取得網址
  private getCurrentUrl(): string {
    return this.router.url;
  }

  ngOnInit(): void {
    // 取得網址
    this.currentUrl = this.getCurrentUrl();

    // 動態取得小計
    this.userCartService.subTotal$.subscribe((data) => {
      this.subTotal = data;
    });

    // 動態取得總計
    this.userCartService.Total$.subscribe((data)=>{
      this.total=data;
    })
  }

}

