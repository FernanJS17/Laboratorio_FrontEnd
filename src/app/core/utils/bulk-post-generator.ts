
import { titles } from './data/titles';
import { authors } from './data/authors';
import { Post } from '../../features/posts/models/posts.model';

// Función para elegir un elemento aleatorio
function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

//MÉTODO PARA LLENAR JSON DE EJEMPLO
export function generateBulkPosts(count = 200): Partial<Post>[] {
  const now = Date.now();
  const usedCombinations = new Set<string>();
  const posts: Partial<Post>[] = [];

  while (posts.length < count) {
    const title = randomFrom(titles);
    const author = randomFrom(authors);
    const key = `${title}::${author}`;

    if (!usedCombinations.has(key)) {
      usedCombinations.add(key);
      posts.push({
        title: `${title} #${now + posts.length}`,
        body: 'Este es un contenido generado automáticamente para pruebas de carga masiva. '.repeat(
          Math.floor(Math.random() * 3) + 2
        ),
        author: author
      });
    }
  }

  return posts;
}
