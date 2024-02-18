import React, { useRef } from 'react';
import axios from "axios";
import './FileUpload.css';

const FileUpload = ({onFileUploaded}) => {
   const fileInputRef = useRef(null);

   const saveFile = async (e) => {
        const formData = new FormData();
        formData.append("form_file", e.target.files[0]);
        formData.append("fileName", e.target.files[0].name);

        try {
            const res = await axios.post("/api/FileUpload/Upload", formData);
            if (res.status === 201) {
                onFileUploaded();
            }
        } catch (ex) { 
            console.log(ex);
        }
   }

   const uploadFile = async (e) => {
        fileInputRef.current.click();
   }; 

   return (
    <div className="ul-seg">
        <input type="file" onInput={saveFile} ref={fileInputRef} style={{display: "none"}}/>
        <button type="submit" className="ulButton" onClick={uploadFile} ></button>
    </div>
   );
};
export default FileUpload;