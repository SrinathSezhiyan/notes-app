import React from "react";

interface ImageFieldProps {
  value?: string;
  id?: string;
  altText?: string;
  className?: string;
  height?: string;
  width?: string;
  outerDivClass?: string;
}

const ImageField: React.FC<ImageFieldProps> = ({
  value = "",
  id = "",
  altText = "",
  height,
  width,
  className = "",
  outerDivClass
}) => {
  return (
    <div className={outerDivClass ?? 'image-div'}>
      <img
        className={className}
        src={value}
        height={height}
        width={width}
        alt={altText}
        id={id}
      />
    </div>
  );
};

export default ImageField;
