import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  public currentUrl : string="";
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.currentUrl = this.getCurrentUrl();
  }

  private getCurrentUrl(): string {
    return this.router.url;
  }

}
