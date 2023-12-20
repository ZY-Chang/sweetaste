import { Component } from '@angular/core';
import { UserCartService } from '../../@api/user-cart.service';

@Component({
  selector: 'app-order2',
  templateUrl: './order2.component.html'
})
export class Order2Component {
  public userCartItem: Array<any> = [];

  constructor(
    private userCartService: UserCartService,
  ) {}

  ngOnInit() {
    this.getUserCart()
  }

  private getUserCart() {
    this.userCartService.getUserCart().subscribe(
      (data: any) => {
        this.userCartItem = data.data;
      },
      (error) => {
        console.log(error.error);
      }
    );
  }
}
