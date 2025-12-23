import { Component } from '@angular/core';

@Component({
  selector: 'app-post-skeleton',
  template: `
    <div class="bg-white p-4 rounded-xl shadow mb-4 animate-pulse">
      <!-- Título -->
      <div class="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>

      <!-- Autor / Fecha -->
      <div class="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>

      <!-- Body -->
      <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div class="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>

      <!-- Botones -->
      <div class="flex gap-2 mt-4">
        <div class="h-8 w-16 bg-gray-300 rounded"></div>
        <div class="h-8 w-16 bg-gray-300 rounded"></div>
        <div class="h-8 w-16 bg-gray-300 rounded"></div>
      </div>
    </div>
  `
})
export class PostSkeletonComponent {}
