import React, { useState } from "react";

const FilterContext = React.createContext();

const FilterProvider = ({ children }) => {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [licenseFilter, setLicenseFilter] = useState("All");
  const [ownedContentFilter, setOwnedContentFilter] = useState("All");

  return <FilterContext.Provider value={{ categoryFilter, licenseFilter, ownedContentFilter, setCategoryFilter, setLicenseFilter, setOwnedContentFilter }}>{children}</FilterContext.Provider>;
};

export { FilterContext, FilterProvider };
