
import React from "react";

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  onError?: React.ReactEventHandler<HTMLImageElement>;
}

const CustomImage: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  onError
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={onError}
      style={{ 
        maxWidth: "100%", 
        height: "auto",
        objectFit: "cover" 
      }}
    />
  );
};

export default CustomImage;
