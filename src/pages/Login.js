import React, { useState, useContext } from "react";
import * as Realm from "realm-web";
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
// Create a component that lets an anonymous user log in
function UserLogin({ setUser }) {
  const loginAnonymous = async () => {
    const user = await app.logIn(Realm.Credentials.anonymous());
    setUser(user);
  };
  return <button onClick={loginAnonymous}>Log In</button>;
}

const Login = () => {
  const { user, setUser } = useContext(UserContext);

  // If a user is logged in, show their details.
  // Otherwise, show the login screen.
  return (
    <div className='login'>
      <div className='login-button'>{user ? <UserDetail user={user} setUser={setUser} /> : <UserLogin setUser={setUser} />}</div>
    </div>
  );
};

export default Login;
