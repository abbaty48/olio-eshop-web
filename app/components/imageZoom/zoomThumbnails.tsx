import { memo, useMemo } from "react";

type TProps = {
    isFailed: boolean;
    isLoading: boolean;
    srcSet: Record<string, string | undefined>
}


export const ZoomThumbnails = memo((props: TProps) => {
    const { isFailed, isLoading, srcSet } = props
    return useMemo(() => {
        return !isLoading && !isFailed &&
            (<figure className="flex md:flex-col gap-3">
                {
                    Object.keys(srcSet).filter(k => k !== 'base').map(k => {
                        const src = srcSet[k as keyof typeof srcSet] || '';
                        return src && <img key={k} src={src} alt={''} role="presentation" className="w-full object-cover h-16 md:h-auto"  width={100} height={100} />
                    })
                }
            </figure>)
    }, [isLoading, isFailed, srcSet])
})
