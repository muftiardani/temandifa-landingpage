export interface FeatureCardProps {
  title: string;
  description: string;
  variant: "blue" | "yellow";
  className?: string;
  decorativeSquare?: {
    className: string;
    bgColor: string;
  };
}

export interface ImageLayerProps {
  src: string;
  alt: string;
  className: string;
  priority?: boolean;
}

export interface PhoneMockupProps {
  children: React.ReactNode;
  className?: string;
  showLogo?: boolean;
}
