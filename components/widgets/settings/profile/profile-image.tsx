import { Camera } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  initialImage: string;
  imageSize?: number;
  pencilFormat?: string;
  isEditing?: boolean;
}

export function ProfileImage({
  initialImage,
  imageSize = 150,
  pencilFormat = "flex rounded-full",
  isEditing = false,
}: ImageUploadProps) {
  const [image, setImage] = useState(initialImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <div className="flex flex-row items-end gap-0">
      <div className="relative size-24 justify-center overflow-hidden rounded-full border-2 border-foreground/25">
        <Image
          src={image}
          alt="business logo"
          className="object-cover"
          width={imageSize}
          height={imageSize}
        />
      </div>
      {isEditing && (
        <Button
          className="z-10 -ml-6 flex size-8 rounded-full"
          onClick={handleButtonClick}
        >
          <Camera className={pencilFormat} />
        </Button>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}
