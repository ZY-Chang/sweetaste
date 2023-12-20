import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent {

  constructor(private titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle('六角甜點工房-產品列表');
  }

  // 傳送資料給子元件
  public sendItem:any;

  // 從子元件接收資料
  public receiveItem(item:any){
    this.sendItem=item;
  }



}
