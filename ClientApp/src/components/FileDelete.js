import './FileDelete.css';

const FileDelete = ({selected, onFileChange}) => {
 
    const delete_file = (e) => {
        if (selected.length === 0) {
            return;
        }
        const url_param= `${"/api/FileUpload/Delete"}?parameter=${encodeURIComponent(selected)}`;

        fetch(url_param, {
            method: 'DELETE',
       })
        .then( response => {
                for (let i = 0; i < selected.length; i++) {
                    document.getElementById(selected[i]).style.backgroundColor='#dee2e7';
                }
                selected.splice(0, selected.length);
                onFileChange();
            }
       );


    }
    
    return (
     <div className="del-seg">
         <button type="submit" className="delButton" onClick={delete_file} ></button>
     </div>
    );
};

export default FileDelete;