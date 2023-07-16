"use client";
export const dynamic = "force-dynamic";

import React, { useState } from "react";
import { Container, Stack, Typography } from "@mui/material";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { gql } from "@apollo/client";

type Props = {
  params: any;
};

type Author = {
  _id?: string;
  name?: string;
};

type BlogType = {
  _id: string;
  title: string;
  content: string;
  author?: Author;
  imageUrl?: string;
};

interface Response {
  post: {
    _id: string;
    title: string;
    content: string;
    author: Author;
    imageUrl: string;
  };
}

const query = gql`
  query Post($postId: ID!) {
    post(id: $postId) {
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

export default function Page({ params }: Props) {
  const { data } = useSuspenseQuery<Response>(query, {
    variables: {
      postId: params.id,
    },
  });
  console.log({ data });
  const [postDetail, setPostDetail] = useState<BlogType>(data.post);

  return (
    <Container>
      <Stack direction="column" spacing={2} sx={{ m: 2 }}>
        <Typography variant="body1">Post id: {postDetail._id}</Typography>
        <Typography variant="body1">Post title: {postDetail.title}</Typography>
        <Typography variant="body1">
          Post content: {postDetail.content}
        </Typography>
        <Typography variant="body1">
          Author id: {postDetail.author?._id}
        </Typography>
        <Typography variant="body1">
          Author name: {postDetail.author?.name}
        </Typography>
        <Typography variant="body1">
          Post imageUrl: {postDetail.imageUrl}
        </Typography>
      </Stack>
    </Container>
  );
}
