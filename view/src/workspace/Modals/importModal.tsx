import React, { useState } from "react";
import axios from "axios";

interface ImportModalProps {
  onFileUpload: (filename: string) => void;  // Added prop for callback function
}

const ImportModal: React.FC<ImportModalProps> = ({ onFileUpload }) => { 
    const [file, setFile] = useState<File | null>(null);
    const [progress, setProgress] = useState({ started: false, pc: 0 });
    const [msg, setMsg] = useState<string>("");

    function handleUpload() {
        if (!file) {
            setMsg("No file selected!");
            return;
        }

        const fd = new FormData();
        fd.append('file', file); 

        setMsg("Uploading...");
        setProgress(prevState => ({ ...prevState, started: true }));

        axios.post('http://127.0.0.1:8080/upload', fd, {
            onUploadProgress: (progressEvent) => {
                const totalLength = progressEvent.total;
                if (totalLength) {
                    setProgress(prevState => ({
                        ...prevState,
                        pc: Math.round((progressEvent.loaded * 100) / totalLength)
                    }));
                }
            },
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(
            res => {
                setMsg("Upload Successful");
                console.log(res.data);
                onFileUpload(file.name);  // Call the callback function with filename
            }
        ).catch(
            err => {
                setMsg("Upload Failed");
                console.log(err);
            }
        );
    }

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            setFile(e.target.files[0]);
            // Immediately trigger the upload after the file is selected
            setTimeout(handleUpload, 0);
        }
    }

    return (
        <div>
            <input onChange={handleOnChange} type="file" />
            <button onClick={handleUpload} disabled={!file}>Upload</button>

            {progress.started && <progress max="100" value={progress.pc}></progress>}
            {msg && <span>{msg}</span>}
        </div>
    );
}

export default ImportModal;
