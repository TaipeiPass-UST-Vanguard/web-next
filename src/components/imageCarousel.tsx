import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

type Props = {
  images: string[];
};

export default function ImageCarousel({ images }: Props) {
  return (
    <Carousel showThumbs={false} showStatus={false} infiniteLoop>
      {images.map((image, index) => (
        <div key={index} className="relative w-full h-[200px]">
          <Image
            src={image}
            alt={`Carousel item ${index}`}
            layout="responsive"
            width={800}
            height={600}
            style={{ objectFit: "contain" }}
          />
        </div>
      ))}
    </Carousel>
  );
};
