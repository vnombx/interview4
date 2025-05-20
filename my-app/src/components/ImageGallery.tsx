import React, { useState, useEffect, useRef, useCallback } from 'react';
import './ImageGallery.css';

interface ImageType {
  thumb: string;
}

interface ImageGalleryProps {
  images?: ImageType[];
  autoPlay?: boolean;
  interval?: number;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images = Array.from({ length: 5 }, (_, i) => ({
    thumb: `https://picsum.photos/200/150?random=${i + 1}`
  })),
  autoPlay = true,
  interval = 3000
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  // const timerRef = useRef();
  const timerRef = useRef<NodeJS.Timeout | null>(null);


  const getScale = (index: number) => {
    const distance = Math.abs(index - activeIndex);
    if (distance === 0) return 1.4;  // 中间放大
    if (distance === 1) return 1.1;  // 两侧稍大
    return 0.9;                      // 其他缩小
  };

  const nextSlide = useCallback(() => {
    setActiveIndex(prev => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = () => {
    setActiveIndex(prev => (prev - 1 + images.length) % images.length);
  };

 useEffect(() => {
    if (autoPlay) {
      timerRef.current = setInterval(nextSlide, interval);
      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [autoPlay, interval, nextSlide]);

  const handleHover = () => {
    if (autoPlay && timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const handleLeave = () => {
    if (autoPlay) {
      timerRef.current = setInterval(nextSlide, interval);
    }
  };

  return (
    <div 
      className="gallery-container"
      ref={containerRef}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      <div className="slider-track">
        {images.map((image, index) => (
          <div
            key={index}
            className="thumbnail-wrapper"
            style={{
              transform: `translateX(${(index - activeIndex) * 110}%) 
                          scale(${getScale(index)})`,
              zIndex: images.length - Math.abs(index - activeIndex)
            }}
          >

            <img
              src={image.thumb}
              alt={`Slide ${index + 1}`}
              className={`thumbnail ${index === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
            />

          </div>
        ))}
      </div>

      {/* 导航按钮 */}
      <button className="nav-button prev" onClick={prevSlide}>&#10094;</button>
      <button className="nav-button next" onClick={nextSlide}>&#10095;</button>
    </div>
  );
};

export default ImageGallery;