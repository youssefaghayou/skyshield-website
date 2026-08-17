const WIDTHS = [828, 1280, 1672] as const;

type Props = {
  /** Asset ID — resolves to public/media/<id>-<w>.{avif,webp} derivatives. */
  id: string;
  /** Empty string for decorative backgrounds with adjacent text. */
  alt: string;
  width: number;
  height: number;
  className?: string;
  /** Above-the-fold media should not lazy-load. */
  eager?: boolean;
};

/**
 * Responsive delivered-asset rendering: AVIF with WebP fallback, explicit
 * dimensions, lazy below the fold. The processing pipeline
 * (tools/assets/process.mjs) owns the derivative set; originals never ship.
 */
export function HeroMedia({ id, alt, width, height, className = "", eager = false }: Props) {
  const srcSet = (ext: string) => WIDTHS.map((w) => `/media/${id}-${w}.${ext} ${w}w`).join(", ");
  return (
    <picture>
      <source type="image/avif" srcSet={srcSet("avif")} sizes="100vw" />
      <img
        src={`/media/${id}-1280.webp`}
        srcSet={srcSet("webp")}
        sizes="100vw"
        alt={alt}
        width={width}
        height={height}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={className}
      />
    </picture>
  );
}
