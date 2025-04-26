import React from "react";
import Image from "next/image";
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
        <Image 
          src={imageSrc} 
          alt={imageAlt} 
          width={400} 
          height={300} 
          className="rounded-lg border"
        />
      </div>
      <CardHeader className="p-4">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
};
