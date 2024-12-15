import { ZoomControls } from "./zoomControls";
import { ZoomImage } from "./zoomImage";
import { HTMLAttributes } from "react";
import { useZoom } from "./useZoom";

type Props = {
    src: string,
    zoomScale?: number;
    maxInDepthZoomScale?: number;
} & HTMLAttributes<HTMLElement>

export default function ImageMagnifier({ src, zoomScale, maxInDepthZoomScale }: Props) {
    const { scalePercent, isLoading, isFailed, isZoomed, resetZoom, zoomIn, zoomOut, canZoomIn, canZoomOut } = useZoom({
        zoomScale,
        url: src,
        maxInDepthZoomScale,
    })

    return (
        <figure className='flex flex-col justify-between bg-white shadow-2xl border-l'>
            {/* Image */}
            <ZoomImage url={src} scalePercentage={scalePercent} isLoading={isLoading} isFailed={isFailed}
                isZoomed={isZoomed} />
            <figcaption>
                {/* controls */}
                <ZoomControls isFailed={isFailed} isZoomed={isZoomed} canZoomIn={canZoomIn} canZoomOut={canZoomOut} zoomIn={zoomIn} zoomOut={zoomOut} resetZoom={resetZoom} />
            </figcaption>
        </figure>
    )
};
