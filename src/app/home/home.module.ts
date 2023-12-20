import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { ArticleComponent } from './article/article.component';

@NgModule({
  declarations: [
    HomeComponent,
    ArticleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class HomeModule { }
