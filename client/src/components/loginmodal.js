import React, { useState, useEffect, useContext } from "react";
import { Backdrop, Box, Button, Modal, Fade, TextField, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
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

export default function LoginModal({ showSignup }) {
  const [open, setOpen] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const location = useLocation();

  // We are using our user context to get and set user details here
  const { user, fetchUser, newLogin } = useContext(UserContext);

  // This function will update the forms values on user input
  const onFormInputChange = (event) => {
    const { name, value } = event.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  // This function will redirect the user to the correct page once auth is done
  const redirectNow = () => {
    const redirectTo = location.search.replace("?redirectTo=", "");
    navigate(redirectTo ? redirectTo : "/races");
  };

  // Check if the user is already logged in and if so, redirect to the correct page, otherwise just let the user login
  const loadUser = async () => {
    if (!user) {
      const fetchedUser = await fetchUser();
      if (fetchedUser) {
        redirectNow();
      }
    }
  };

  // This will only run once the component is mounted and will aid in helping verify if a user is already logged in or not
  useEffect(() => {
    loadUser();
  }, []);

  // This function will handle when a user clicks the submit button
  const onSubmit = async (event) => {
    try {
      // Pass the user details to the login function to validate credentials and log the user in
      const user = await newLogin(loginForm.email, loginForm.password);
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
              <TextField label='Email' name='email' type='email' variant='filled' size='small' sx={{ margin: "15px 0px" }} value={loginForm.email} onChange={onFormInputChange} />
              <TextField label='Password' name='password' type='password' variant='filled' size='small' sx={{ margin: "15px 0px" }} value={loginForm.password} onChange={onFormInputChange} />
            </Box>
            <Box className='submit-button' sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
              <Button onClick={onSubmit}>Sign in</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
