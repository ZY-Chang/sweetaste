import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCartService } from '../../../@api/user-cart.service';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
})
export class DeliveryComponent {
  // 表單群組，要引入ReactiveFormsModule
  public deliveryForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userCartService: UserCartService
  ) {
    // 初始化表單
    this.deliveryForm = this.formBuilder.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      tel: ['', [Validators.required, Validators.pattern('^09[0-9]{8}$')]],
      city: ['高雄市', Validators.required], //下拉式選單預設選擇高雄市
      district: ['新興區', Validators.required],
      address: ['', Validators.required],
    });
  }

  ngOnInit(): void {}


  // 下一步
  public NextStep(event:Event) {
    // 停止預設提交行為
    event.preventDefault()

    // 檢查表單的有效性
    if (this.deliveryForm.invalid) {
      // 如果表單無效，停止執行後續邏輯
      alert('請正確填寫配送資訊');
      return;
    }

    // 獲取表單
    const lastname = this.deliveryForm.get('lastname')?.value;
    const firstname = this.deliveryForm.get('firstname')?.value;
    const tel = this.deliveryForm.get('tel')?.value;
    const city = this.deliveryForm.get('city')?.value;
    const district = this.deliveryForm.get('district')?.value;
    const address = this.deliveryForm.get('address')?.value;

    // 合併 name
    const fullName = `${lastname} ${firstname}`;
    // 合併 address
    // const fullAddress = `${city} ${district} ${address}`;

    // 呼叫saveDeliveryInfo
    this.userCartService.setDeliveryInfo(fullName, tel, city, district, address);

    // 導航到下一步
    this.router.navigate(['/checkout/process/pay']);
  }
}
