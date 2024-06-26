// src/components/FileUpload.js
import React, { useState } from 'react';

const FileUpload = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    onFileSelect(e.target.files[0]);
  };

  return (
    <div className="flex items-center">
      <input
        type="file"
        onChange={handleFileChange}
        className="p-2 border rounded max-w-60"
      />
      {/* {selectedFile && <span className="ml-4">{selectedFile.name}</span>} */}
    </div>
  );
};

export default FileUpload;
