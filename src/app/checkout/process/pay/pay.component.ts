import { Component } from '@angular/core';
import { FormBuilder, FormGroup ,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
})
export class PayComponent {
  payForm:FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ){
    // 初始化表單
    this.payForm = this.formBuilder.group({
      cardId: ['',[Validators.required,Validators.pattern('^\\d{4}(\\s?\\d{4}){3}$')]],
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      validityMonth: ['', Validators.required],
      validityYear: ['', Validators.required],
      cardCVN: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
    });

    // 從表單 (payForm) 中獲取 cardId 控制項。valueChanges訂閱信用卡卡號的變化
    this.payForm.get('cardId')!.valueChanges.subscribe((value: string) => {
      // 移除空格，只保留數字，避免使用者自己輸入空格
      const cleanedValue = value.replace(/\s/g, '');
      // 在每四個數字後插入一個空格
      const formattedValue = cleanedValue.replace(/(\d{4})/g, '$1 ').trim();
      // 將格式化的值，更新到表單
      this.payForm.get('cardId')!.setValue(formattedValue, { emitEvent: false });
    });
  }

  NextStep(event:Event){
    // 停止預設提交行為
    event.preventDefault()

    console.log(this.payForm.value);

    // 檢查表單的有效性
    if (this.payForm.invalid) {
      // 如果表單無效，停止執行後續邏輯
      alert('請正確填寫付款資訊');
      return;
    }

    // 導航到下一步
    this.router.navigate(['/checkout/process/bill-1']);

  }

}
