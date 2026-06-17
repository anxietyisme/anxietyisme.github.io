import Image from "next/image";

interface HandwrittenSketchProps {
  src: string;
  alt: string;
  caption?: string;
}

export function HandwrittenSketch({ src, alt, caption }: HandwrittenSketchProps) {
  return (
    <figure className="my-8">
      <div className="border border-border p-1 bg-[#fcfcfc] dark:bg-black">
        <Image
          src={src}
          alt={alt}
          width={800}
          height={600}
          className="w-full h-auto block m-0"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
