import { FunctionComponent, useRef, useState } from "react";
import styles from "./FileUpload.module.css";

export type FileUploadType = {
    text?: string;
};

const FileUpload: FunctionComponent<FileUploadType> = ({
    text = "File Upload",
}) => {

    const [fileName, setFileName] = useState("");
    const fileInputRef: any = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const handleDivClick = () => {
        if (selectedFile) return;
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];

        if (file) {
            setSelectedFile(file);
            setFileName(file.name)
            console.log("Selected file:", file.name, fileName);
        }
    };

    return (
        <div className={styles.fileUpload} onClick={handleDivClick}>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
            />
            {!selectedFile && <img
                className={styles.whiteAttachIcon}
                alt=""
                src="/white-attach-icon.svg"
            />
            }
            {!selectedFile && <img
                className={styles.purpleAttachIcon}
                alt=""
                src="/purple-attach-icon.svg"
            />
            }
            <div className={styles.placeholder}>{fileName === ""? text : fileName}</div>
            {selectedFile && <div
                className={`${styles.iconwrapper} ${styles.delete}`}
                onClick={() => {
                    if (selectedFile) {
                        fileInputRef.current.value = "";
                        setSelectedFile(null);
                        setFileName("")
                    }
                }}
            />}
        </div>
    );
};

export default FileUpload;

