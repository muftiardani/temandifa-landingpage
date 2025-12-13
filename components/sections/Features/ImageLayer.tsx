import Image from "next/image";
import { blurDataURL } from "@/lib/seo/image-placeholders";

interface ImageLayerProps {
  src: string;
  alt: string;
  className: string;
  priority?: boolean;
}

export function ImageLayer({
  src,
  alt,
  className,
  priority = false,
}: ImageLayerProps) {
  const getBlurPlaceholder = (imageSrc: string) => {
    if (imageSrc.includes("menu-mockup")) return blurDataURL.menuMockup;
    if (imageSrc.includes("camera-mockup")) return blurDataURL.cameraMockup;
    if (imageSrc.includes("mic-mockup")) return blurDataURL.micMockup;
    if (imageSrc.includes("video-mockup")) return blurDataURL.videoMockup;
    return blurDataURL.default;
  };

  return (
    <div className={className}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain"
        priority={priority}
        placeholder="blur"
        blurDataURL={getBlurPlaceholder(src)}
      />
    </div>
  );
}
