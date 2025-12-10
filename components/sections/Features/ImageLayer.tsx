import Image from "next/image";

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
