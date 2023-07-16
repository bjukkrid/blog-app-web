"use client";
import React, { FormEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { gql, useSuspenseQuery } from "@apollo/client";
import { Author } from "@/interfaces/AuthorInterface";
import { useMutation } from "@apollo/client";
import Swal from "sweetalert2";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};

const CREATE_POST = gql`
  mutation CreatePost(
    $title: String!
    $content: String!
    $author: String!
    $imageUrl: String!
  ) {
    createPost(
      title: $title
      content: $content
      author: $author
      imageUrl: $imageUrl
    ) {
      _id
      title
      content
      imageUrl
      author {
        _id
      }
    }
  }
`;

const GET_AUTHORS = gql`
  query Authors {
    authors {
      _id
      name
    }
  }
`;

type Props = {};

export default function CreatePost({}: Props) {
  const [addPost, { data, loading, error }] = useMutation(CREATE_POST);

  const resAuthors = useSuspenseQuery<any>(GET_AUTHORS);
  // console.log({ resAuthors });
  const [authorList, setAuthorList] = useState(resAuthors.data.authors);

  const [form, setForm] = useState({
    title: "",
    content: "",
    author: "",
    imageUrl: "",
  });

  const [open, setOpen] = useState(false);
  const handleModal = () => {
    setOpen(!open);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    Swal.fire({
      icon: "warning",
      title: "Please confirm?",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      denyButtonText: `Cancel`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        addPost({ variables: form }).then((result) => {
          // alert(JSON.stringify(result));
          window.location.reload();
        });
      }
    });
  };

  return (
    <>
      <Button variant="contained" onClick={handleModal} disableRipple>
        Create Post
      </Button>
      <Modal
        open={open}
        onClose={handleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                type="text"
                label="title"
                fullWidth
                onChange={(e) => {
                  setForm({ ...form, title: e.target.value });
                }}
                required
              />
              <TextField
                type="text"
                label="content"
                fullWidth
                onChange={(e) => {
                  setForm({ ...form, content: e.target.value });
                }}
                required
              />
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>Authors</InputLabel>
                <Select
                  value={form.author}
                  onChange={(e: SelectChangeEvent) => {
                    setForm({ ...form, author: e.target.value });
                  }}
                  label="Author"
                  required
                >
                  {authorList.map((au: Author) => (
                    <MenuItem key={au._id} value={au._id}>
                      {au.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                type="text"
                label="imageUrl"
                fullWidth
                onChange={(e) => {
                  setForm({ ...form, imageUrl: e.target.value });
                }}
              />
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
    </>
  );
}
