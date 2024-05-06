import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const WysiwygEditorComponent = ({ label, name, onChange }) => {
    return (
        <div>
            <label>{label} :</label>
            <ReactQuill id={name} name={name}
                onChange={onChange}
            />
        </div>
    );
};

export default WysiwygEditorComponent;
