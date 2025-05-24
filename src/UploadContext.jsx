import React, { createContext, useState, useContext } from "react";

const UploadContext = createContext();

export const useUpload = () => useContext(UploadContext);

export const UploadProvider = ({ children }) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  return (
    <UploadContext.Provider value={{ uploadProgress, setUploadProgress, isUploading, setIsUploading }}>
      {children}
    </UploadContext.Provider>
  );
};