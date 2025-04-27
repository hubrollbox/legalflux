import NextImage, { ImageProps as NextImageProps } from "next/image";
import { cn } from "./utils";

export interface ImageProps extends Omit<NextImageProps, "src" | "alt"> {
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
    <NextImage
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