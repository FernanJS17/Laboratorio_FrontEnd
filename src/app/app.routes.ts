import { Routes } from '@angular/router';

import { PostsListPageComponent } from './features/posts/pages/post-list/post-list.page';
import { PostDetailPageComponent } from './features/posts/pages/post-detail/post-detail.page';
import { PostFormPageComponent } from './features/posts/pages/post-form/post-form.page';
import { PostsBulkPageComponent } from './features/posts/pages/post-bulk/post-bulk.page';
import { authGuard } from './core/guards/auth.guard';
import { LoginPageComponent } from './features/posts/pages/login/login.page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginPageComponent, canActivate: [authGuard], },
  { path: 'posts', component: PostsListPageComponent, canActivate: [authGuard], },
  { path: 'posts/bulk', component: PostsBulkPageComponent, canActivate: [authGuard], },
  { path: 'posts/create', component: PostFormPageComponent, canActivate: [authGuard], },
  { path: 'posts/:id/edit', component: PostFormPageComponent, canActivate: [authGuard], },
  { path: 'posts/:id', component: PostDetailPageComponent, canActivate: [authGuard], },


  // fallback opcional
  { path: '**', redirectTo: 'login' }
];
