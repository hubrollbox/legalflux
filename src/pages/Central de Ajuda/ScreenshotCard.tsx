
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface ScreenshotCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export const ScreenshotCard: React.FC<ScreenshotCardProps> = ({
  title,
  description,
  imageSrc,
  imageAlt
}) => {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video bg-gray-100 relative">
        <img 
          src={imageSrc} 
          alt={imageAlt} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
};
