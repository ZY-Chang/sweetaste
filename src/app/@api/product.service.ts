import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {
  private url="/sweetApi";

  constructor(private http:HttpClient) { }

  // 取得所有產品分類
  public getAllProductType():Observable<any>{
    return  this.http.post( this.url + '/getAllProductType',{})
  }

  // 依照分類取得產品
  public getProductsByTypeId(typeId:number){
    return this.http.post(this.url+'/getProductsByTypeId' ,{typeId})
  }

}
