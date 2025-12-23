import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from './components/button/button.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { LoadingDirective } from './directives/loading.directive';
import { FormatDatePipe } from './pipes/format-date-pipe';
import { RouterModule } from '@angular/router';
import { ToastComponent } from './components/toast/toast.component';
import { ConfirmModalComponent } from './components/modal/confirm-modal.component';
import { PostSkeletonComponent } from './components/skeleton/post-skeleton.component';
import { CommentSkeletonComponent } from './components/skeleton/comment-skeleton.component';

@NgModule({
  declarations: [
    ButtonComponent,
    FormatDatePipe,
    TruncatePipe,
    LoadingDirective,
    ToastComponent,
    ConfirmModalComponent,
    PostSkeletonComponent,
    CommentSkeletonComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ButtonComponent,
    FormatDatePipe,
    TruncatePipe,
    LoadingDirective,
    ToastComponent,
    ConfirmModalComponent,
    PostSkeletonComponent,
    CommentSkeletonComponent
  ]
})
export class SharedModule {}
