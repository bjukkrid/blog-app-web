"use client";

import React, { FormEvent, useState } from "react";
import { Box, Button, Modal, Stack, TextField } from "@mui/material";
import { gql, useMutation } from "@apollo/client";
import Swal from "sweetalert2";

const CREATE_AUTHOR = gql`
  mutation CreateAuthor($name: String!) {
    createAuthor(name: $name) {
      _id
      name
    }
  }
`;

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};

type Props = {};

export default function CreateAuthor({}: Props) {
  const [name, setName] = useState<string>("");

  const [addAuthor, { data, loading, error }] = useMutation(CREATE_AUTHOR);

  const [open, setOpen] = useState(false);
  const handleModal = () => {
    setOpen(!open);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    addAuthor({ variables: { name: name } }).then((result) => {
      console.log({ result });
      if (result.data) {
        Swal.fire("Success", "Create author successful", "success").then(
          (result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          }
        );
      }
    });
  };

  return (
    <>
      <Button variant="contained" onClick={handleModal} disableRipple>
        Create Author
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
                label="name"
                fullWidth
                onChange={(e) => setName(e.target.value)}
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
