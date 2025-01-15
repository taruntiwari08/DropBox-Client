import React, { createContext, useState } from "react";

export const FileUpdateContext = createContext();

export const FileProvider = ({ children }) => {
  const [updateFiles, setUpdateFiles] = useState(false);

  const triggerFileUpdate = () => {
    setUpdateFiles((prev) => !prev);
  };

  return (
    <FileUpdateContext.Provider value={triggerFileUpdate}>
      {children}
    </FileUpdateContext.Provider>
  );
};
