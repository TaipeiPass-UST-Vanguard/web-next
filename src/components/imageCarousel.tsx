import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

type CarouselProps = {
    images: string[];
};

const ImageCarousel: React.FC<CarouselProps> = ({ images }) => {
    return (
        <Carousel showThumbs={false} showStatus={false} infiniteLoop>
            {images.map((image, index) => (
                <div key={index} className="relative w-full h-[200px] px-5">
                    <Image
                        src={image}
                        alt={`Carousel item ${index}`}
                        layout="responsive"
                        width={800}
                        height={600}
                        style={{ objectFit:"contain" }}
                    />
                </div>
            ))}
        </Carousel>
    );
};

export default ImageCarousel;