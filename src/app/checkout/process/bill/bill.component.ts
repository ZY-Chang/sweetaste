import { LoginService } from './../../../@api/login.service';
import { UserCartService } from './../../../@api/user-cart.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
})
export class BillComponent {
  // 表單群組，要引入ReactiveFormsModule
  public billForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userCartService: UserCartService,
    private loginService:LoginService
  ) {
    // 初始化表單
    this.billForm = this.formBuilder.group({
      email: ['',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'),
        ],
      ],
      taxID: ['', [Validators.pattern('^[0-9]{8}$')]],
    });
  }

  ngOnInit(): void { }

  // 提交訂單
  public submit(event: Event) {
    // 停止預設提交行為
    event.preventDefault();

    // 檢查表單的有效性
    if (this.billForm.invalid) {
      // 如果表單無效，停止執行後續邏輯
      alert('請正確填寫配送資訊');
      return;
    }

    // 呼叫結帳
    this.userCartService.checkoutUserCart().subscribe(
      (data: any) => {
        if (data.status === 200) {
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
