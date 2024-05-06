import React, { useState } from 'react';

const ImageComponent = ({ label, name, onFilesSelected }) => {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (event) => {
        const files = event.target.files;
        setSelectedFiles([...selectedFiles, ...files]);
        onFilesSelected([...selectedFiles, ...files]);
    };

    return (
        <div className={"input-component"}>
            <label htmlFor={name}>{label}</label>
            <input
                type="file"
                multiple
                id={name}
                name={name}
                accept="image/*"
                onChange={handleFileChange}
            />
            {selectedFiles.map((file, index) => (
                <div key={index}>{file.name}</div>
            ))}
        </div>
    );
};

export default ImageComponent;
