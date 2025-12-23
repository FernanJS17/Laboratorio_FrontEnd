import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { PostsListPageComponent } from './pages/post-list/post-list.page';
import { PostDetailPageComponent } from './pages/post-detail/post-detail.page';
import { PostFormPageComponent } from './pages/post-form/post-form.page';
import { PostCardComponent } from './components/posts-card/posts-card-component';
import { CommentItemComponent } from './components/comment-item/comment-item.component';
import { RouterModule } from '@angular/router';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { PostsBulkPageComponent } from './pages/post-bulk/post-bulk.page';
import { LoginPageComponent } from './pages/login/login.page.component';

@NgModule({
  declarations: [
    PostsListPageComponent,
    PostDetailPageComponent,
    PostFormPageComponent,
    PostCardComponent,
    CommentItemComponent,
    CommentFormComponent,
    PostsBulkPageComponent,
    LoginPageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule
  ]
})
export class PostsModule {}
