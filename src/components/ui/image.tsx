
import React from "react";
import { cn } from "@/lib/utils";

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  objectFit?: React.CSSProperties['objectFit'];
  objectPosition?: React.CSSProperties['objectPosition'];
}

const Image = ({ src, alt, className, width, height, objectFit, objectPosition, ...props }: ImageProps) => {
  const style = {
    ...(objectFit && { objectFit }),
    ...(objectPosition && { objectPosition })
  };

  return (
    <img
      src={src}
      alt={alt}
      className={cn("object-cover", className)}
      width={width}
      height={height}
      style={Object.keys(style).length ? style : undefined}
      {...props}
    />
  );
};

export { Image };
