import './FileDownload.css';

const FileDownload = ({selected}) => {
 
    const download = async (e) => {
        if (selected.length === 0) {
            return;
        }
        const url_param= `${"/api/FileUpload/Download"}?parameter=${encodeURIComponent(selected)}`;

        fetch(url_param, {
            method: 'GET',
            headers: {
                Accept: 'application/octet-stream'
            },
       })
       .then(response => {
            const disposition = response.headers.get('Content-Disposition');
            const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            const matches = filenameRegex.exec(disposition);
            const filename = matches[1].replace(/['"]/g, '');

            return response.blob()
            .then(blob => {
                var url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.setAttribute('download', filename);
                link.href = url;
                link.dispatchEvent(
                    new MouseEvent('click', { 
                      bubbles: true, 
                      cancelable: true, 
                      view: window 
                    })
                  );
            });
       })
    }
    
    return (
     <div className="dl-seg">
         <button type="submit" className="dlButton" onClick={download} ></button>
     </div>
    );
};

export default FileDownload;