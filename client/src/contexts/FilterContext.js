import React, { useState } from "react";

const FilterContext = React.createContext();

const FilterProvider = ({ children }) => {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [licenseFilter, setLicenseFilter] = useState("All");
  const [ownedContentFilter, setOwnedContentFilter] = useState("All");
  const [searchBarText, setSearchBarText] = useState("");

  return <FilterContext.Provider value={{ categoryFilter, licenseFilter, ownedContentFilter, searchBarText, setCategoryFilter, setLicenseFilter, setOwnedContentFilter, setSearchBarText }}>{children}</FilterContext.Provider>;
};

export { FilterContext, FilterProvider };
