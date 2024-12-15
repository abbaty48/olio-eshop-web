import { memo, useCallback, useEffect, useRef } from "react";
import { CiImageOff } from "react-icons/ci";

type TProps = {
    url: string;
    isFailed: boolean;
    isLoading: boolean;
    isZoomed: boolean;
    scalePercentage: number;
}

export const ZoomImage = memo((props: TProps) => {
    const { url, isFailed, isLoading, isZoomed, scalePercentage } = props
    const magnifierImageRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        magnifierImageRef.current?.addEventListener('mousemove', onmousemove);
        magnifierImageRef.current?.addEventListener('mouseleave', onmouseleave);
        return () => {
            magnifierImageRef.current?.removeEventListener('mousemove', onmousemove);
            magnifierImageRef.current?.removeEventListener('mouseleave', onmouseleave);
        }
    }, [magnifierImageRef.current, isZoomed, scalePercentage])

    const onmousemove = useCallback(function (e: MouseEvent) {
        if (magnifierImageRef.current && isZoomed) {
            const image = magnifierImageRef.current;
            const scale = scalePercentage * 2
            // Get the width of the thumbnail
            let boxWidth = image.clientWidth,
                _ratio = image.clientHeight / boxWidth,
                // Get the cursor position, minus element offset
                x = e.pageX - image.offsetLeft,
                y = e.pageY - image.offsetTop,
                // Convert coordinates to % of elem. width & height
                xPercent = x / (scale / 100) + "%",
                yPercent = y / ((scale * _ratio) / 100) + "%";

            // Update styles w/actual size
            Object.assign(image.style, {
                backgroundPosition: xPercent + " " + yPercent,
                backgroundSize: scalePercentage * 2 + '%',
            });
        }
    }, [isZoomed, scalePercentage]) // end _mainMagnifier.onmousemove

    // Reset when mouse leaves
    const onmouseleave = useCallback(function (_: MouseEvent) {
        if (magnifierImageRef.current) {
            Object.assign(magnifierImageRef.current.style, {
                backgroundPosition: "center",
                backgroundSize: scalePercentage + '%'
            }); // end object.assign
        }
    }, [isZoomed, scalePercentage]);

    return isFailed ? <CiImageOff fontSize={'8rem'} className="place-self-center -order-1 md:order-none" role="presentation" /> :
        isLoading ? (
            <div className="loader place-self-center -order-1 md:order-none" role={'presentation'}></div>
        ) : (
            <div
                className={'-order-1 md:-order-none m-auto w-[96vmin] md:w-full h-full'}
            >
                <div
                    className={'w-full h-full'}
                >
                    <div
                        ref={magnifierImageRef}
                        style={{
                            height: "100%",
                            objectFit: 'cover',
                            backgroundPosition: `cover`,
                            backgroundImage: `url(${url})`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: `${scalePercentage}%`,
                        }}
                    ></div>
                </div>
            </div>
        )
})
