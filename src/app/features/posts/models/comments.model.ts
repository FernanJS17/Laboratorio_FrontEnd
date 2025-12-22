import { Post } from './posts.model';

export interface Comment {
  _id: string;
  body: string;
  name: string;
  email: string;
  createdAt: string;
  postId: string | Post;
}
