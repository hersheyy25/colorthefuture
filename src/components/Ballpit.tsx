type BallpitProps = {
  className?: string;
  followCursor?: boolean;
  count?: number;
  colors?: number[];
  ambientColor?: number;
  ambientIntensity?: number;
  lightIntensity?: number;
  minSize?: number;
  maxSize?: number;
  size0?: number;
  gravity?: number;
  friction?: number;
  wallBounce?: number;
  maxVelocity?: number;
  maxX?: number;
  maxY?: number;
  maxZ?: number;
};

export default function Ballpit({ className = '' }: BallpitProps) {
  return <div className={className} aria-hidden="true" />;
}
