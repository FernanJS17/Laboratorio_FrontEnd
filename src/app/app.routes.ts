import { Routes } from '@angular/router';

import { PostsListPageComponent } from './features/posts/pages/post-list/post-list.page';
import { PostDetailPageComponent } from './features/posts/pages/post-detail/post-detail.page';
import { PostFormPageComponent } from './features/posts/pages/post-form/post-form.page';
import { PostsBulkPageComponent } from './features/posts/pages/post-bulk/post-bulk.page';

export const routes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },

  { path: 'posts', component: PostsListPageComponent },
  { path: 'posts/bulk', component: PostsBulkPageComponent },
  { path: 'posts/create', component: PostFormPageComponent },
  { path: 'posts/:id', component: PostDetailPageComponent },
  { path: 'posts/:id/edit', component: PostFormPageComponent },


  // fallback opcional
  { path: '**', redirectTo: 'posts' }
];
