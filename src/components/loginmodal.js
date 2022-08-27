import React, { useState } from "react";
import * as Realm from "realm-web";
import { Backdrop, Box, Button, Modal, Fade, TextField, Typography } from "@mui/material";
import { app } from "../utils/mongo-client";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "15px",
};

export default function LoginModal({ setUser }) {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle when a user clicks on the login button
  const handleOpen = () => setOpen(true);

  // Function for closing the modal
  const handleClose = () => setOpen(false);

  // Create a component that lets a user login
  const login = async (payload) => {
    const credentials = Realm.Credentials.function(payload);
    try {
      const user = await app.logIn(credentials).then((response) => {
        response.functions.verifyLoginCredentials({ username: payload.username, password: payload.password }).then((response) => {
          console.log(response);
        });
      });
      //console.assert(user.id === app.currentUser.id);
      console.assert(user.id === app.currentUser.id);
      setUser(user);
      return user;
    } catch (error) {
      console.log("Failed to log in", error);
    }
  };

  return (
    <div>
      <button onClick={handleOpen}>Log In</button>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography sx={{ fontWeight: 700, fontSize: "25px", display: "flex", flexDirection: "row", justifyContent: "center" }}>Login</Typography>
            <Box className='login-input-container' sx={{ display: "flex", flexDirection: "column" }}>
              <TextField id='username' label='Username' variant='filled' size='small' sx={{ margin: "15px 0px" }} onChange={(e) => setUsername(e.target.value)} />
              <TextField id='password' label='Password' variant='filled' size='small' sx={{ margin: "15px 0px" }} onChange={(e) => setPassword(e.target.value)} />
            </Box>
            <Box className='submit-button' sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
              <Button onClick={(e) => login({ username: username, password: password })}>Sign in</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
