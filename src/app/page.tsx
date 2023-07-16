import React from "react";
import {
  Container,
  Stack,
  Typography,
  Paper,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Link from "next/link";
import { getClient } from "../lib/client";
import { gql } from "@apollo/client";
import CreatePost from "./createPost";
import CreateAuthor from "./createAuthor";
import Image from "next/image";

export const dynamic = "force-dynamic";

interface Response {
  posts: {
    _id: string;
    title: string;
    content: string;
    author: Author;
    imageUrl: string;
  }[];
}

type Author = {
  id?: string;
  name?: string;
};

type BlogType = {
  _id: string;
  title: string;
  content: string;
  author?: Author;
  imageUrl?: string;
};

const SuperCard = ({ _id, title, content, author, imageUrl }: BlogType) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      {/* <Image src={imageUrl} width={500} height={500} alt={imageUrl} /> */}
      <CardContent>
        <Link href={`/post/${_id}`}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
        </Link>
        <Typography variant="body2">{content}</Typography>
        <Typography variant="body2" color="#252540">
          {author?.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default async function Home() {
  const client = getClient();
  const query = gql`
    query QueryPosts {
      posts {
        _id
        title
        content
        imageUrl
        author {
          _id
          name
        }
      }
    }
  `;
  const { data } = await client.query<Response>({
    query,
    context: {
      fetchOptions: {
        next: { revalidate: 5 },
      },
    },
  });
  console.log("data >", data);

  return (
    <div>
      <Container>
        <Stack
          spacing={2}
          sx={{
            m: 3,
          }}
        >
          <Typography variant="h5" textAlign="center">
            BLOG APP
          </Typography>
        </Stack>

        <Stack
          direction="row-reverse"
          spacing={2}
          sx={{
            margin: 2,
          }}
        >
          <CreateAuthor />
          <CreatePost />
        </Stack>

        <Grid container spacing={3}>
          {data.posts.length > 0 ? (
            data.posts.map((blog, index) => (
              <Grid xs={4} key={index}>
                <SuperCard
                  _id={blog._id}
                  title={blog.title}
                  content={blog.content}
                  author={blog.author}
                  imageUrl={blog.imageUrl}
                />
              </Grid>
            ))
          ) : (
            <Typography variant="h5" textAlign="center">
              No posts
            </Typography>
          )}
        </Grid>
      </Container>
    </div>
  );
}
