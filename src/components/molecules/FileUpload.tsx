import React, { RefObject } from 'react';
import mime from 'mime';
import { FileFieldType } from '../../@types/NotesTypes';

type Props = {
  field: FileFieldType;
  handleChange: (file: File, field: FileFieldType) => void;
  inputRef?: RefObject<HTMLInputElement>
};

const FileUpload: React.FC<Props> = ({ field, handleChange, inputRef }) => {

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event?.target?.files;
    if (fileList?.[0]) {
      const file = fileList[0];
      const validFileExtensions = field.accept.split(',').map((ext: string) => ext.trim());
      const validMimeTypes = validFileExtensions.map((ext: string) => mime.getType(ext));

      if (!validMimeTypes.includes(file.type)) {
        alert(`Invalid file type. Please upload a file of type: ${field.accept}`);
        return;
      }

      if (file.size > field.maxSize) {
        alert(`File size exceeds the limit of ${field.maxSize / (1024 * 1024)}MB. Please upload a smaller file.`);
        return;
      }
      handleChange(file, field);
    }
  };

  return (
    <div className=''>
      <span title={field?.hovertext}>
        <label htmlFor={field.name} className='cursor-pointer'>
          <span>{field?.icon}</span>
        </label>
      </span>
      <input
        name={field?.name}
        className='visually-hidden'
        type="file"
        accept={field?.accept}
        onChange={handleInputChange}
        id={field?.name}
        ref={inputRef}
      />
    </div>
  );
};

export default FileUpload;
