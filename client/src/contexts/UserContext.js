import React, { useState, createContext } from "react";
import { Credentials } from "realm-web";
import { app } from "../utils/mongo-client";

// User context to manage and access all user related functions across components
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(app.currentUser);

  // Function that logs a user into our realm app using email and password
  const newLogin = async (email, password) => {
    const credentials = Credentials.emailPassword(email, password);
    const authenticatedUser = await app.logIn(credentials);
    setUser(authenticatedUser);
    return authenticatedUser;
  };

  // Function for a new user signup
  const newSignup = async (email, password) => {
    try {
      // Register and login the user once he signs up
      await app.emailPasswordAuth.registerUser(email, password);
      return newLogin(email, password);
    } catch (error) {
      throw error;
    }
  };

  // Function to fetch a user from local storage if he is already logged in
  const fetchUser = async () => {
    // If nobody is logged in return false
    if (!app.currentUser) return false;
    try {
      await app.currentUser.refreshCustomData();

      // If we get a user set the user we fetched to the apps current user and return the current user
      setUser(app.currentUser);
      return app.currentUser;
    } catch (error) {
      throw error;
    }
  };

  // Function to log a user out
  const logoutUser = async () => {
    // If no user is signed in, return false since we cannot log anybody out
    if (!app.currentUser) return false;
    try {
      // Log the user out and set the current user back to null
      await app.currentUser.logOut();
      setUser();
      return true;
    } catch (error) {
      throw error;
    }
  };

  return <UserContext.Provider value={{ user, setUser, newLogin, newSignup, fetchUser, logoutUser }}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
