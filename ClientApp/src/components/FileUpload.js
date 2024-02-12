import React, { useState } from 'react';
import axios from "axios";
import './FileUpload.css';

const FileUpload = () => {
   const [file, setFile] = useState();
   const [fileName, setFileName] = useState();

   const saveFile = (e) => {
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
   };

   const uploadFile = async (e) => {
        const formData = new FormData();
        formData.append("form_file", file);
        formData.append("fileName", fileName);

        try {
            const res = await axios.post("/api/FileUpload/Upload", formData);
            console.log(res);
        } catch (ex) {
            console.log(ex);
        }
   }; 

   return (
    <div className="ul-seg">
        <input type="file" onChange={saveFile} />
        <button type="submit" className="ulButton" onClick={uploadFile} ></button>
    </div>
   );

};

export default FileUpload;