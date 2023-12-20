import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
})
export class NotfoundComponent {

  constructor(private titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle('404');
  }

}
