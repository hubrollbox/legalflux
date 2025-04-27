import React from "react";
import { cn } from "./utils";

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  layout?: 'fixed' | 'intrinsic' | 'responsive' | 'fill';
  objectFit?: React.CSSProperties['objectFit'];
  objectPosition?: React.CSSProperties['objectPosition'];
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ src, alt, className, width, height, layout, objectFit, objectPosition, ...props }, ref) => {
    const style = {
      ...(objectFit && { objectFit }),
      ...(objectPosition && { objectPosition })
    };
    
    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={cn("object-cover", className)}
        width={width}
        height={height}
        style={Object.keys(style).length ? style : undefined}
        {...props}
      />
    );
  }
);

Image.displayName = "Image";

export { Image };