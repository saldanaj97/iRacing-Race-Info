import React, { useState } from "react";

const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();

  return <FilterContext.Provider value={{ user, setUser }}>{children}</FilterContext.Provider>;
};

export { UserContext, UserProvider };
