import { Container, Stack } from "@mui/material";
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {};

export default function Loading({}: Props) {
  return (
    <Container>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <CircularProgress />
        Loading...
      </Stack>
    </Container>
  );
}
