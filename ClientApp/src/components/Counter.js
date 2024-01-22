import React, { useState } from "react";
import axios from "axios";

export const Counter = () => {
  const [file, setFile] = useState([]);    //define list instead
  
  const handleFileChange = (e) => {
    setFile([...file,e.target.files[0]])      //append the file list
    };

  const importFile= async (e) => {

    console.log(file);   //check all files

    for (const uploadedFile of file){
      if (uploadedFile) {
        const formData = new FormData();      //make a new FormData for every file.
        formData.append("file",uploadedFile,uploadedFile.name);

        try {
          const res = await axios.post("https://localhost:7161/1/importfile", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Accept: "application/json",
            },
          });
        } catch (ex) {
          console.log(ex);
        }
  };}}
    

  return  (
    <>
    <input
                // className={`w-full md:w-full px-2 md:mb-0 block uppercase tracking-wide text-gray-700 text-xs font-bold mt-2 mb-2 ${fileStyles.customFileInput}`}
                id="quote"
                name="quote"
                type="file"
                accept="application/pdf"
                title="Attach Quote"
                onChange={handleFileChange}
              />

            <input type="button" value="upload" onClick={importFile} />

    </>
  )
    
};