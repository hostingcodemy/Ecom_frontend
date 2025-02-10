import React, { useState, useRef, useEffect } from "react";

const ProductGallery = ({ image }) => {
    const [mainImage, setMainImage] = useState(image);
    const [thumbnailPosition, setThumbnailPosition] = useState({
        top: 0,
        left: 0,
        width: 0,
        height: 0,
    });

    const thumbnailRefs = useRef([]);
    const mainImageRef = useRef(null);

    const calculatePosition = (index) => {
        const thumbnailElement = thumbnailRefs.current[index];
        const rect = thumbnailElement.getBoundingClientRect();
        const containerRect = mainImageRef.current.getBoundingClientRect();

        setThumbnailPosition({
            top: rect.top - containerRect.top-98,
            left: rect.left - containerRect.left+84,
            width: rect.width+7,
            height: rect.height+7,
        });
    };

    const changeImage = (imageSrc, index) => {
        setMainImage(imageSrc);
        calculatePosition(index);
    };

    useEffect(() => {
        const handleResize = () => {
            const index = [image].indexOf(mainImage);
            if (index !== -1) {
                calculatePosition(index);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [mainImage]);

    useEffect(() => {
        const index = [image].indexOf(mainImage);

        if (index !== -1) {
            calculatePosition(index);
        }
    }, [mainImage, image]); 

    return (
        <div className="flex items-center space-x-6 ml-5">
            <div className="flex flex-col space-y-4 relative">
                <div
                    className="emptyDiv absolute border-[0.1vw] border-orange-400 rounded-lg transition-all duration-500 ease-in-out z-30"
                    style={{
                        top: thumbnailPosition.top,
                        left: thumbnailPosition.left,
                        width: thumbnailPosition.width,
                        height: thumbnailPosition.height,
                    }}
                ></div>

                <div
                    ref={(el) => (thumbnailRefs.current[0] = el)}
                    className="relative transition-all duration-300 ease-in-out w-16 h-16"
                    onClick={() => changeImage(image, 0)}
                >
                    <img
                        className=" cursor-pointer rounded-md h-[100%] w-[100%]"
                        src={image}
                        alt="Thumbnail 1"
                    />
                </div>

                <div
                    ref={(el) => (thumbnailRefs.current[1] = el)}
                    className="relative transition-all duration-300 ease-in-out w-16 h-16"
                    onClick={() => changeImage(image, 1)}
                >
                    <img
                        className=" cursor-pointer rounded-md h-[100%] w-[100%]"
                        src={image}
                        alt="Thumbnail 2"
                    />
                </div>

                <div
                    ref={(el) => (thumbnailRefs.current[2] = el)}
                    className="relative transition-all duration-300 ease-in-out w-16 h-16"
                    onClick={() => changeImage(image, 2)}
                >
                    <img
                        className=" cursor-pointer rounded-md h-[100%] w-[100%]"
                        src={image}
                        alt="Thumbnail 3"
                    />
                </div>
            </div>

            <div ref={mainImageRef} className="flex-1 w-[70vw] h-[70vh]  rounded-xl">
                <img
                    className="w-[100%] h-[100%] object-contain rounded-xl"
                    src={mainImage}
                    alt="Product"
                />
            </div>
        </div>
    );
};

export default ProductGallery;
