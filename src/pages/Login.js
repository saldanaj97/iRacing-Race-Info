import React, { useContext } from "react";
import LoginModal from "../components/loginmodal";
import { UserContext } from "../contexts/UserContext";
import { app } from "../utils/mongo-client";

// Create a component that displays the given user's details
function UserDetail({ user, setUser }) {
  const logoutAnonymous = async () => {
    app.currentUser.logOut();
    setUser();
  };
  return (
    <div>
      <text>{user.id}</text>
      <button onClick={logoutAnonymous}>Log Out</button>
    </div>
  );
}

const Login = () => {
  const { user, setUser } = useContext(UserContext);

  // If a user is logged in, show their details. Otherwise, show the login button
  return (
    <div className='login'>
      <div className='login-button'>{user ? <UserDetail user={user} setUser={setUser} /> : <LoginModal setUser={setUser} />}</div>
    </div>
  );
};

export default Login;
