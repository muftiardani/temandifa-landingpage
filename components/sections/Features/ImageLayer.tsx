import Image from "next/image";
import type { ImageLayerProps } from "./types";

export function ImageLayer({
  src,
  alt,
  className,
  priority = false,
}: ImageLayerProps) {
  return (
    <div className={className}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain"
        priority={priority}
      />
    </div>
  );
}
