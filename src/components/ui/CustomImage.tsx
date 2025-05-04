
import React, { useState } from 'react';

interface CustomImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  width?: number;
  height?: number;
  src: string;
  alt: string;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  className?: string;
}

const CustomImage: React.FC<CustomImageProps> = ({
  width,
  height,
  src,
  alt,
  onError,
  className,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setHasError(true);
    if (onError) onError(e);
  };

  if (hasError) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-100 text-gray-400 ${className}`}
        style={{ width, height }}
      >
        Imagem não disponível
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      onError={handleError}
      className={className}
      {...props}
    />
  );
};

export default CustomImage;
