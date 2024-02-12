import axios from "axios";
import './FileUpload.css';

const FileUpload = ({ onFileUploaded }) => {

    const uploadFile = async (e) => {
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
   }; 

   return (
        <div className="ul-seg">
            <input type="file" className="ulButton" onChange={uploadFile} />
        </div>
   );

};

export default FileUpload;