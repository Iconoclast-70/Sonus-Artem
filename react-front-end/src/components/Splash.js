import React from "react";
import "./styles/Splash.scss";
import "bootstrap/dist/css/bootstrap.min.css";

import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Stack";

export default function Splash(props) {
  return (
    <Stack
      direction="column"
      alignItems="center"
      divider={<Divider orientation="horizontal" flexItem />}
      spacing={0}
    >
      <img
        id="splash"
        className="splash-image"
        src={require(`${props.splashImage}`)}
        alt=""
      />
    </Stack>
  );
}
