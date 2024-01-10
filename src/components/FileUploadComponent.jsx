import React, { useState } from "react";
import { uploadFile } from "./api/api";
import { useNavigate, useParams } from "react-router-dom";

function FileUploadComponent() {
  const [file, setFile] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    uploadFile(id, formData)
      .then((response) => {
        alert("File Uploaded");
      })
      .catch((error) => console.log(error));
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>File Upload</h1>
        <input type="file" onChange={handleChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default FileUploadComponent;
