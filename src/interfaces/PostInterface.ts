import { Author } from "./AuthorInterface";

export interface Post {
  _id: string;
  title: string;
  content: string;
  author?: Author;
  imageUrl?: string;
}
