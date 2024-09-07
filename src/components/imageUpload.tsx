"use client";

import { useEffect, useState } from "react";
import ImageCarousel from "./imageCarousel";
import ImageViewModel from "@/module/image/presenter/imageViewModel";
import ImageRepoImpl from "@/module/image/presenter/imageRepoImpl";
import ImageUsecase from "@/module/image/application/imageUsecase";

const usecase = new ImageUsecase(new ImageRepoImpl());

type Props = {
  onChange?: (images: number[]) => void;
};

export default function ImageUpload({
  onChange,
}: Props) {
  const [images, setImages] = useState<ImageViewModel[]>([]);
  const [isUploading, setIsUploading] = useState<boolean[]>([]);

  function handleBrowse(files: FileList | null) {
    if (files === null) return;

    setIsUploading(new Array(files.length).fill(true));
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file === null) continue;

      usecase.uploadImage(file).then(entity => {
        setImages(prev => [...prev, new ImageViewModel(entity)]);
        setIsUploading(prev => prev.pop() ? prev : []);
      })
    }
  }

  useEffect(() => {
    onChange?.(images.map(image => image.id));
  }, [isUploading]);

  return images.length === 0
    ? (
      <div
        className="w-full h-[200px] rounded-lg bg-slate-300 flex flex-row items-center justify-center cursor-pointer"
        onClick={() => document.getElementById("upload")?.click()}
      >
        {isUploading.length > 0 ? "Uploading..." : "Upload Image"}
        <input
          id="upload"
          type="file"
          multiple={true}
          hidden={true}
          accept="image/*"
          onChange={event => handleBrowse(event.target.files)}
        />
      </div>
    )
    : (
      <ImageCarousel images={images.map(image => image.imageUrl)} />
    );
}
