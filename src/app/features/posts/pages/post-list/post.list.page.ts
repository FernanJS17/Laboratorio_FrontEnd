import { Component, OnInit, computed, signal } from '@angular/core';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-posts-list-page',
  template: `
    <div class="p-6">

        <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Posts</h1>

      <button
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        routerLink="/posts/create"
      >
        + Crear Post
      </button>

      <button
        class="bg-red-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        routerLink="/posts/bulk"
      >
        ! Carga Masiva
      </button>
    </div>

    <input
      class="border p-2 rounded w-full mb-4"
      placeholder="Buscar por título"
      (input)="search.set($any($event.target).value)"
    />

      <div *ngIf="postsService.loading()" class="mb-4">
        Cargando posts...
      </div>

      <div *ngIf="!postsService.loading() && filteredPosts().length === 0">
        No hay posts disponibles.
      </div>

      <div class="grid gap-4">
        <app-post-card
          *ngFor="let post of filteredPosts()"
          [post]="post"
        ></app-post-card>
      </div>


      <div class="flex justify-between items-center mt-6">
      <button
        class="px-4 py-2 border rounded disabled:opacity-40"
        (click)="prev()"
        [disabled]="page() === 1"
      >
        Anterior
      </button>

      <span class="text-sm text-gray-600">
        Página {{ page() }}
      </span>

      <button
        class="px-4 py-2 border rounded disabled:opacity-40"
        (click)="next()"
        [disabled]="page() >= postsService.totalPages()"
      >
        Siguiente
      </button>
    </div>



    </div>
  `
})
export class PostsListPageComponent implements OnInit {

  search = signal('');
  debouncedSearch = computed(() => this.search().trim());


  page = signal(1);
  limit = signal(5);

  filteredPosts = computed(() => {
    const search = this.debouncedSearch().toLowerCase();
    return this.postsService.posts().filter(p =>
      p.title.toLowerCase().includes(search)
    );
  });


  constructor(public postsService: PostsService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.postsService.getAll(this.page(), this.limit()).subscribe();
  }

  next(): void {
    if (this.page() >= this.postsService.totalPages()) return;
    this.page.update(p => p + 1);
    this.load();
  }

  prev(): void {
    if (this.page() === 1) return;
    this.page.update(p => p - 1);
    this.load();
  }
}
