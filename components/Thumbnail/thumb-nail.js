import PlaceholderImage from "./PlaceholderImage"
import clsx from "clsx"
import Image from "next/image"
import React, { useState, useEffect } from "react"


const Thumbnail = ({
  thumbnail,
  primaryImage,
  secondaryImage,
  isHovering,
  size = "small",
  productPage = false,
}) => {
  const [currentImage, setCurrentImage] = useState(thumbnail || primaryImage);

  // Update the current image when the hover state changes
  useEffect(() => {
    setCurrentImage(isHovering ? secondaryImage : primaryImage);
  }, [isHovering, primaryImage, secondaryImage]);

  return (
    <div
      className={clsx("relative", {
        "aspect-[24/34] md:aspect-[34/34]": !productPage,
        "aspect-[3/3.75]": productPage,
        "w-[80px]": size === "xs",
        "w-[180px]": size === "small",
        "w-[290px]": size === "medium",
        "w-[440px]": size === "large",
        "w-full": size === "full",
      })}
    >
      <ImageOrPlaceholder image={currentImage} size={size} />
    </div>
  );
};


const ImageOrPlaceholder = ({ image, size }) => {
  return image ? (
    <Image
      src={image}
      alt="Thumbnail"
      layout="fill"
      objectFit="cover"
      objectPosition="center"
      className="absolute inset-0"
      draggable={false}
    />
  ) : (
    <div className="w-full h-full absolute inset-0 bg-gray-100 flex items-center justify-center">
      <PlaceholderImage size={size === "small" ? 16 : 24} />
    </div>
  );
};


export default Thumbnail
