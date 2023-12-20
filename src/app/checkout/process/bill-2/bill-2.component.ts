import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCartService } from '../../../@api/user-cart.service';
import { LoginService } from '../../../@api/login.service';

@Component({
  selector: 'app-bill-2',
  templateUrl: './bill-2.component.html',
})
export class Bill2Component {
  // 表單群組，要引入ReactiveFormsModule
  public bill2Form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userCartService: UserCartService,
    private loginService: LoginService
  ) {
    // 初始化表單
    this.bill2Form = this.formBuilder.group({
      city: ['高雄市', Validators.required], //下拉式選單預設選擇高雄市
      district: ['新興區', Validators.required],
      address: ['', Validators.required],
      taxID: ['', [Validators.pattern('^[0-9]{8}$')]],
      sameAddress: [false]  // 添加同郵寄地址的控制項
    });
  }

  ngOnInit(): void { }

  // 同郵寄地址
  public toggleSameAddress() {
    if (this.bill2Form.get('sameAddress')?.value) {
      // 如果選中「同郵寄地址」，則使用郵寄地址填充發票地址
      const { city, district, address } = this.userCartService.getDeliveryAddress();
      this.bill2Form.patchValue({ city, district, address });
    } else {
      // 如果取消選中，清空發票地址
      this.bill2Form.patchValue({ city: null, district: null, address: null });
    }
  }

  // 提交訂單
  public submit(event: Event) {
    // 停止預設提交行為
    event.preventDefault();

    // 檢查表單的有效性
    if (this.bill2Form.invalid) {
      // 如果表單無效，停止執行後續邏輯
      alert('請正確填寫配送資訊');
      return;
    }

    // 呼叫結帳
    this.userCartService.checkoutUserCart().subscribe(
      (data: any) => {
        if (data.status === 200)
        {
          // 導航到下一步
          this.router.navigate(['/checkout/success']);
          alert('訂單成功送出');
        }
      },
      (error) => {
        console.log(error.error);
      }
    );
  }
}
