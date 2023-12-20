import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
})
export class ProcessComponent {
  constructor(private titleService: Title) {}

  ngOnInit() {
    this.titleService.setTitle('六角甜點工房-結帳');
  }
}
