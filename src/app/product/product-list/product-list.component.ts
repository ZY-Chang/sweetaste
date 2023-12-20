import { Component, EventEmitter, NgZone, Output } from '@angular/core';
import { ProductApiService } from '../../@api/product.service';
import { catchError, concatMap, forkJoin, map, of, } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent {
  public productObj: Array<any> = []; // 分類和分類裡面的產品
  public selectedItem: number = 0; //選擇的分類ID，控制selected

  // 事件發射器
  @Output() ChangeProduct = new EventEmitter<number>();

  constructor(
    private productApiService: ProductApiService,
  ) {}

  ngOnInit() {
    this.getAllProductType();
  }

  // 當被點擊時，發射item
  public onItemSelected(item: any) {
    this.ChangeProduct.emit(item);
    // 更改selected
    this.selectedItem = item.typeID;
  }

  private getAllProductType() {
    return this.productApiService.getAllProductType().subscribe((data: any) => {
      // 成功取得分類，從分類ID取得各分類甜點資料
      const productList = data.data;

      // 這個map是 array類別的方法，用於返回一個新的array
      this.productObj = productList.map((item: any) => {
        //pipe 是一個rxjs的方法，用於串聯和組合多個方法，以便對 Observable 進行一系列的轉換和處理，在這邊pipe組合了concatMap和catchError
        return this.productApiService.getProductsByTypeId(Number(item[0])).pipe(
          // 這個map是rxjs的map，它用於轉換 Observable 流中的每一個元素，並返回一個新的 Observable 流。
          // concatMap可以確定順序一樣
          concatMap((productData: any) => {
            return of({
              typeID: Number(item[0]),
              typeName: item[1],
              typeLength: productData.data.length,
              typeContent: productData.data,
            });
          }),
          catchError(() => {
            // 如果沒有資料，就 push 0
            return of({
              typeID: Number(item[0]),
              typeName: item[1],
              typeLength: 0,
              typeContent: [],
            });
          })
        );
      });

      // 使用 rxjs 裡面的 forkJoin 函數 等待 productObj 呼叫完成
      forkJoin(this.productObj).subscribe((result: any[]) => {
        // 將新陣列賦值給 productObj
        this.productObj = result;
        // 預設selected
        this.selectedItem = this.productObj[0].typeID;
      });
    });
  }

}



  //   // 取得甜點分類，並顯示選單
  //   private getAllProductType() {
  //     return this.productApiService.getAllProductType().subscribe((data: any) => {
  //       // 成功取得分類，從分類ID取得各分類甜點資料
  //       const productList = data.data;

  //       // 這個map是 array類別的方法，用於返回一個新的array
  //       this.productObj = productList.map((item: any) => {
  //         //pipe 是一個rxjs的方法，用於串聯和組合多個方法，以便對 Observable 進行一系列的轉換和處理，在這邊pipe組合了map和catchError
  //         return this.productApiService.getProductsByTypeId(Number(item[0])).pipe(
  //           // 這個map是rxjs的map，它用於轉換 Observable 流中的每一個元素，並返回一個新的 Observable 流。
  //           map((productData: any) => {
  //             // 把資料長度和資料push進去
  //             item.push(productData.data.length);
  //             item.push(productData.data);
  //             return item;
  //           }),
  //           catchError(() => {
  //             // 如果沒有資料，就push 0
  //             item.push(0);
  //             return of(item);
  //           })
  //         );
  //       });
  //       // 使用 rxjs裡面的 forkJoin 函數 等待所有的 API 呼叫完成
  //       forkJoin(this.productObj).subscribe((result) => {
  //         this.productObj = result;
  //         this.selectedItem=this.productObj[0][0];
  //       });
  //     });
  //   }

