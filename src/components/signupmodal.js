import React, { useState, useContext } from "react";
import { Backdrop, Box, Button, Modal, Fade, TextField, Typography } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

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

export default function SignupModal() {
  const [open, setOpen] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const location = useLocation();

  // Explained in the login page
  const { newSignup } = useContext(UserContext);

  // Explained in the login page
  const onFormInputChange = (event) => {
    const { name, value } = event.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  // Explained in the login page
  const redirectNow = () => {
    const redirectTo = location.search.replace("?redirectTo=", "");
    navigate(redirectTo ? redirectTo : "/");
  };

  // Explained in the login page
  const onSubmit = async (event) => {
    try {
      const user = await newSignup(loginForm.email, loginForm.password);
      if (user) {
        redirectNow();
      }
    } catch (error) {
      alert(error);
    }
  };

  // Function to handle when a user clicks on the login button
  const handleOpen = () => setOpen(true);

  // Function for closing the modal
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button onClick={handleOpen}>Signup</button>
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
            <Typography sx={{ fontWeight: 700, fontSize: "25px", display: "flex", flexDirection: "row", justifyContent: "center" }}>Register</Typography>
            <Box className='login-input-container' sx={{ display: "flex", flexDirection: "column" }}>
              <TextField label='Email' name='email' type='email' variant='filled' size='small' sx={{ margin: "15px 0px" }} value={loginForm.email} onChange={onFormInputChange} />
              <TextField label='Password' name='password' type='password' variant='filled' size='small' sx={{ margin: "15px 0px" }} value={loginForm.password} onChange={onFormInputChange} />
            </Box>
            <Box className='submit-button' sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
              <Button onClick={onSubmit}>Sign up</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
