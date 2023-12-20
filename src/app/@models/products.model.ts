import { stringify } from "querystring";

export interface products {
  productId: string;
  orderQuantity: string;
  name: string;
  price: string;
  inventories: string;
  img: string;
}
// 單純從api裡面撈資料並顯示


export class products {
  productId: string;
  orderQuantity: string;
  name: string;
  price: string;
  inventories: string;
  img: string;
  constructor(_productId:string="", _orderQuantity:string="" , _name: string="", _price: string="", _inventories: string="", _img: string=""){
    this.productId=_productId;
    this.orderQuantity=_orderQuantity;
    this.name=_name;
    this.price=_price;
    this.inventories=_inventories;
    this.img=_img;
  }
}
// 如果還要新增東西回去
