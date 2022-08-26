import React, { useState } from "react";
import { app } from "../utils/mongo-client";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(app.currentUser);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
