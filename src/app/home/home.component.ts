import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl:'./home.component.css',
})
export class HomeComponent {

  constructor(
    private titleService: Title,
    private router: Router,
  ) {}

  ngOnInit() {
    this.titleService.setTitle('六角甜點工房-首頁');
  }

  public routerToProduct(){
    this.router.navigate(['/product']);
  }


}
