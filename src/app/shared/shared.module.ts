import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from './components/button/button.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { LoadingDirective } from './directives/loading.directive';
import { FormatDatePipe } from './pipes/format-date-pipe';
import { RouterModule } from '@angular/router';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [
    ButtonComponent,
    FormatDatePipe,
    TruncatePipe,
    LoadingDirective,
    ToastComponent
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
    ToastComponent
  ]
})
export class SharedModule {}
