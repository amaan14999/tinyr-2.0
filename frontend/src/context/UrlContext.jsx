import React, { createContext, useState } from "react";

export const UrlContext = createContext();

export const UrlProvider = ({ children }) => {
  const [urlData, setUrlData] = useState([]);

  const addUrl = (newUrl) => {
    setUrlData([...urlData, newUrl]);
  };

  return (
    <UrlContext.Provider value={{ urlData, addUrl }}>
      {children}
    </UrlContext.Provider>
  );
};
