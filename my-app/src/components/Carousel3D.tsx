import React, { useState, useEffect, useRef } from 'react';
import './Carousel3D.css';

interface ImageType {
    url: string;
    alt?: string;
}

interface Carousel3DProps {
    images: ImageType[];
    autoPlay?: boolean;
    interval?: number;
}

const Carousel3D: React.FC<Carousel3DProps> = ({
    images,
    autoPlay = true,
    interval = 3000
}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const total = images.length;
    const [isMobile, setIsMobile] = useState(false);

    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // 新版位置计算函数
    const calculatePosition = (index: number) => {
        const diff = (index - activeIndex + total) % total;
        const position = diff > total / 2 ? diff - total : diff;

        // 基础布局参数
        // const frontZ = 400;    // 前排Z轴位移
        // const backZ = -200;    // 后排Z轴位移
        // const sideX = 250;     // 左右位移量
        // const sideRotate = 10; // 左右旋转角度
        // const posX = 0

       const frontZ = isMobile ? 200 : 400;
        const backZ = isMobile ? -100 : -200;
        const sideX = isMobile ? 120 : 250;
        const sideRotate = isMobile ? 5 : 10;
        const posX = isMobile ? 20 : 0;

        if (position === 0) { // 中间主图
            return {
                translateX: posX,
                translateZ: frontZ,
                rotateY: 0,
                opacity: 1,
                scale: 1.2,
                zIndex: 30
            };
        }

        if (Math.abs(position) === 1) { // 左右两侧图片
            return {
                translateX: position * sideX + posX,
                translateZ: frontZ - 100,
                rotateY: position * sideRotate,
                opacity: 1,
                scale: 0.9,
                zIndex: 20
            };
        }

        // 后排隐藏图片
        return {
            translateX: 0,
            translateZ: backZ,
            rotateY: 0,
            opacity: 0.3,
            scale: 0.6,
            zIndex: 10
        };
    };

    const next = () => setActiveIndex(prev => (prev + 1) % total);
    const prev = () => setActiveIndex(prev => (prev - 1 + total) % total);

    //   useEffect(() => {
    //     if (autoPlay) {
    //       timerRef.current = setInterval(next, interval);
    //       return () => clearInterval(timerRef.current);
    //     }
    //   }, [autoPlay, interval]);

    useEffect(() => {
        if (autoPlay) {
            timerRef.current = setInterval(next, interval);
            return () => {
                if (timerRef.current) {
                    clearInterval(timerRef.current);
                }
            };
        }
    }, [autoPlay, interval, next]);

    const handleIndicatorClick = (index: number) => {
        setActiveIndex(index);
    };

    const handleHover = () => timerRef.current && clearInterval(timerRef.current);
    const handleLeave = () => autoPlay && (timerRef.current = setInterval(next, interval));

    return (
        <div
            className="carousel-3d-container"
            ref={containerRef}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
        >
            <div className="carousel-track">
                {images.map((img, index) => {
                    const style = calculatePosition(index);

                    return (
                        <div
                            key={index}
                            className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
                            style={{
                                transform: `
                  translateX(${style.translateX}px)
                  translateZ(${style.translateZ}px)
                  rotateY(${style.rotateY}deg)
                  scale(${style.scale})
                `,
                                opacity: style.opacity,
                                zIndex: style.zIndex
                            }}
                        >

                            <div className='carousel-item-content'>

                                <div className='carousel-item-title'>
                                    {/* <h4>123</h4> */}
                                    <div className='carousel-center-item'>123</div>
                                    <div className='carousel-item-btn'>
                                        <span className='t1'>111</span>
                                        <div className='select'>
                                        </div>
                                    </div>
                                </div>

                                <div className='carousel-item-des'>
                                    {/* <span className='t1'>333</span> */}
                                    <div className='col1'>

                                        <div className="circle-image-container">
                                            <img src="https://fastly.picsum.photos/id/279/300/200.jpg?hmac=oDZxkcbox9EYg7itO0eWRVg3I6zC99VM8GEisywko3Y" alt="圆形图片" />
                                        </div>

                                    </div>
                                    <div className='col2'>
                                        <span>123123</span>
                                    </div>
                                    <div className='col3'>

                                        <div
                                            className="send-btn large"
                                        >
                                            Send
                                        </div>
                                    </div>

                                </div>
                                <img
                                    src={img.url}
                                    alt={img.alt || `Slide ${index}`}
                                    className="thumbnail"
                                />
                            </div>
                            {/* <h1>123</h1> */}

                        </div>
                    );
                })}
            </div>

            <div className="indicators-container">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`indicator ${index === activeIndex ? 'active' : ''}`}
                        onClick={() => handleIndicatorClick(index)}
                        aria-label={`跳转到第 ${index + 1} 张图片`}
                    />
                ))}
            </div>

            {/* <button className="nav-button prev" onClick={prev}>&lt;</button>
            <button className="nav-button next" onClick={next}>&gt;</button> */}
        </div>
    );
};

export default Carousel3D;