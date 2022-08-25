import React, { useState } from "react";

const WeekContext = React.createContext();

const WeekProvider = ({ children }) => {
  const [weekNum, setWeekNum] = useState(1);

  return <WeekContext.Provider value={{ weekNum, setWeekNum }}>{children}</WeekContext.Provider>;
};

export { WeekContext, WeekProvider };
