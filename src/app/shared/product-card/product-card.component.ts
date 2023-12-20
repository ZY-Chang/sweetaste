import { LoginService } from './../../@api/login.service';
import { UserCartService } from './../../@api/user-cart.service';
import { Component, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ProductApiService } from '../../@api/product.service';

declare var $: any;

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  private currentUrl: string = ''; // 判斷目前的頁面
  private isLogin : boolean = this.loginService.isLogin()
  public itemCol: number = 0; // 決定col大小
  public products: Array<any> = []; // 所有產品
  public currentProducts: Array<any> = []; // 當前頁面的產品
  public currentTag = '本日精選'; // Tag
  public modalData: Array<any> = []; // modal的產品資料
  public quantity: number = 1; // modal的訂購數量

  @Input() sendItem: any; //從父元件取得資料

  constructor(
    private router: Router,
    private productService: ProductApiService,
    private userCartService: UserCartService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    // 取得網址
    this.currentUrl = this.getCurrentUrl();

    // home
    if (this.currentUrl === '/home') {
      // 控制卡片排版
      this.itemCol = 4;
      // 載入產品
      this.productService.getProductsByTypeId(1).subscribe((data) => {
        this.currentProducts = (data as any).data.slice(0, 3);
      });
      // product
    } else if (this.currentUrl === '/product') {
      // 控制卡片排版
      this.itemCol = 6;
      // 預設載入產品
      this.productService.getProductsByTypeId(1).subscribe((data) => {
        this.currentProducts = (data as any).data;
      });
    }
  }

  // 輸入屬性（Input）發生變化時觸發 ngOnChanges()
  ngOnChanges() {
    // 拆開父元件取得的資料
    if (this.sendItem) {
      this.products = this.sendItem.typeContent;
      this.currentTag = this.sendItem.typeName;
      // 如果產品夠多
      if (this.products.length > this.perPage) {
        // 重置頁碼
        this.currentPage = 1;
        // 計算頁碼
        this.calPageNumbers();
        // 取出當前頁碼的產品
        this.getCurrentProducts(this.products);
      } else {
        this.currentProducts = this.products;
      }
    }
  }

  // 取得url
  private getCurrentUrl(): string {
    return this.router.url;
  }
  // 收藏
  public setHeart(item: any) {
    item.heart = !item.heart;
  }

  // 取得當前頁面的產品
  private getCurrentProducts(allProducts:Array<any>) {
    // 起始資料、結束資料
    let startData = (this.currentPage-1) * this.perPage; //0、6、12
    let endData = startData + this.perPage -1; //5、11
    if (endData > allProducts.length - 1) {
      endData = allProducts.length - 1;
    }
    this.currentProducts = allProducts.slice(startData, endData+1);
  }

  // --------------modal---------------

  // 加入購物車，判斷是否登入，是就把把產品資料傳入modal，否則導入登入頁面
  public setModalData(item: Array<any>) {
    if (this.isLogin) {
      // 重置數量
      this.quantity = 1;
      this.modalData = item;
      $('#addModal').modal('show');
    } else {
      alert('請先登入');
      this.router.navigateByUrl('/login');
    }
  }
  // -
  public decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
  // +
  public increaseQuantity() {
    this.quantity++;
  }

  // 新增購物車
  public addUserCart(productId: number, orderQuantity: number) {
    this.userCartService.addUserCart(productId, orderQuantity).subscribe(
      (data: any) => {
        if (data.status === 200) {
          alert('新增成功');
        }
      },
      (error) => {
        alert(error.error.message);
        console.log(error.error);
      }
    );
  }

  // --------------page---------------

  public pageNumbers: number[] = []; //  頁碼陣列
  public currentPage: number = 1; //  當前頁碼
  private perPage: number = 6; // 每一頁顯示多少產品

  //  計算頁碼的邏輯
  private calPageNumbers() {
    const pageCount = Math.ceil(this.products.length / this.perPage);
    // 第一個參數是陣列長度，第二個參數是一個箭頭函式，index是當前索引，index+1 是下一個索引值的邏輯
    this.pageNumbers = Array.from(
      { length: pageCount },
      (_, index) => index + 1
    );
  }

  //  換頁的函數
  public changePage(page: number) {
    this.currentPage = page;
    this.getCurrentProducts(this.products);
  }
}
