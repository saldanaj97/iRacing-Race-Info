import React, { useContext } from "react";
import { Box } from "@mui/material";
import LoginModal from "../components/loginmodal";
import SignupModal from "../components/signupmodal";
import { UserContext } from "../contexts/UserContext";

// Create a component that gives the user the option to logout
function Logout() {
  const { logoutUser } = useContext(UserContext);
  const logUserOut = async () => {
    try {
      // Call the logout function from the context
      const loggedOut = await logoutUser();
      if (loggedOut) {
        window.location.reload(true);
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div>
      <button onClick={logUserOut}>Log Out</button>
    </div>
  );
}

const Login = () => {
  const { user } = useContext(UserContext);

  // If a user is logged in, show their details. Otherwise, show the login button
  return (
    <div className='login'>
      <div className='login-button'>
        {user ? (
          <Logout />
        ) : (
          <Box sx={{ display: "flex", direction: "row", justifyContent: "center", margin: "0px 15px" }}>
            <Box sx={{ margin: "0px 15px" }}>
              <LoginModal />
            </Box>
            <Box>
              <SignupModal />
            </Box>
          </Box>
        )}
      </div>
    </div>
  );
};

export default Login;
