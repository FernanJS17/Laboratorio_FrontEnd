import { Component, OnInit, computed, signal, effect } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Subject, debounceTime, switchMap } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-posts-list-page',
  templateUrl: './post-list.page.component.html'
})

export class PostsListPageComponent implements OnInit {

  search = signal('');
  debouncedSearch = computed(() => this.search().trim());

  page = signal(1);
  limit = signal(5);

  showLogoutModal = false;


  private reload$ = new Subject<void>();

  filteredPosts = computed(() => {
    const search = this.debouncedSearch().toLowerCase();
    return this.postsService.posts().filter(p =>
      p.title.toLowerCase().includes(search)
    );
  });

  constructor(public postsService: PostsService,
     private auth: AuthService,
     private router: Router,
     private toast: ToastService) {
    // Suscripción que llama al servicio cada vez que reload$ emite
    this.reload$
      .pipe(
        debounceTime(200),
        switchMap(() => this.postsService.getAll(this.page(), this.limit()))
      )
      .subscribe();
  }

    askLogout(): void {
        this.showLogoutModal = true;
        return;
  }

    logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  // Effect que dispara reload$ cuando cambian signals
  reloadEffect = effect(() => {
    this.reload$.next();
    this.page();
    this.limit();
    this.debouncedSearch();
  });

  ngOnInit(): void {
    // vacio, ya que todo se dispara con signals
  }

  next(): void {
    if (this.page() >= this.postsService.totalPages()) return;
    this.page.update(p => p + 1);
  }

  prev(): void {
    if (this.page() === 1) return;
    this.page.update(p => p - 1);
  }

  onPostDeleted(): void {
    this.reload$.next();
  }
}
