import { Author } from "./AuthorInterface";

export interface ResponseGetPostAll {
  getAllPosts: {
    _id: string;
    title: string;
    content: string;
    author: Author;
    imageUrl: string;
  }[];
}

export interface ResponseGetPostById {
  getPostById: {
    _id: string;
    title: string;
    content: string;
    author: Author;
    imageUrl: string;
  };
}
