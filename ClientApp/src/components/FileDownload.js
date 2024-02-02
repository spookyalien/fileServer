import './FileDownload.css';

const FileDownload = (props) => {
 
    const download = async (e) => {
        if (props.selected.length === 0) {
            return;
        }
        const url_param= `${"api/FileUpload/Download"}?parameter=${encodeURIComponent(props.selected)}`;

        fetch('https://localhost:44473/' + url_param, {
            method: 'GET',
            headers: {
                Accept: 'application/zip',
                'Content-Type': 'application/zip'
            },
       })
       .then((response) => response.blob())
       .then((blob) => {
            var url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.dispatchEvent(
                new MouseEvent('click', { 
                  bubbles: true, 
                  cancelable: true, 
                  view: window 
                })
              );
        })
       .catch(error => {
            console.error('Error downloading: ', error);
       });
    }; 
 
    return (
     <div className="dl-seg">
         <button type="submit" className="dlButton" onClick={download} ></button>
     </div>
    );
};

export default FileDownload