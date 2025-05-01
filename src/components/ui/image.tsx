
import React from 'react';
import { cn } from '@/lib/utils';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, src, alt, fallback = '/placeholder-image.png', ...props }, ref) => {
    const [imgSrc, setImgSrc] = React.useState<string | undefined>(src);
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
      setImgSrc(src);
      setError(false);
    }, [src]);

    const handleError = () => {
      setError(true);
      setImgSrc(fallback);
    };

    return (
      <img
        ref={ref}
        src={error ? fallback : imgSrc}
        alt={alt || ''}
        onError={handleError}
        className={cn('object-cover', className)}
        {...props}
      />
    );
  }
);

Image.displayName = 'Image';
