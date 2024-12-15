import { useCallback, useEffect, useState } from "react";

type TState = {
    scale: number,
    isFailed: boolean,
    isLoading: boolean,
    isZoomed: boolean,
    canZoomIn: boolean,
    canZoomOut: boolean,
    scalePercent: number,
}
export function useZoom({ url, zoomScale, maxInDepthZoomScale, imageLoaded }:
    { url: string, zoomScale?: number, maxInDepthZoomScale?: number, imageLoaded?: CallableFunction }) {

    const [
        states,
        setStates] = useState<TState>(() => ({
            isFailed: false,
            isLoading: true,
            isZoomed: false,
            canZoomIn: true,
            canZoomOut: false,
            scalePercent: 100,
            scale: zoomScale ?? 0,
        }))

    const { scale, scalePercent, isZoomed, isLoading, isFailed, canZoomOut, canZoomIn } = states

    const changeState = (setter: (states: TState) => Partial<TState>) => {
        setStates(prevStates => ({ ...prevStates, ...setter.call(null, states) }));
    }

    useEffect(() => {
        changeState(_ => ({ isLoading: true, isFailed: false }))
        fetch(url, { method: "GET" })
            .then(_ => imageLoaded?.())
            .catch(_ => changeState(_ => ({ isFailed: true })))
            .finally(() => changeState(_ => ({ isLoading: false })))

    }, [url, imageLoaded]);

    const zoomIn = useCallback(() => {
        try {
            if (scale >= Number(maxInDepthZoomScale ?? Math.sqrt(scale))) {
                changeState(_ => ({ canZoomIn: false, canZoomOut: true }))
                return;
            }
            {
                const _scale = parseFloat(Number(scale + 0.1).toFixed(1))
                const _scalePercentage = scalePercent + (_scale * 100);
                changeState(_ => ({
                    scale: _scale, scalePercent: _scalePercentage,
                    canZoomOut: true, canZoomIn: _scale < 1.0, isZoomed: true
                }))
            }
        } catch (error) { }
    }, [scale]); // end zoom function
    const zoomOut = useCallback(() => {
        try {
            if (scale <= 0) {
                changeState(_ => ({ canZoomIn: true, canZoomOut: false }))
                return;
            }
            {
                const _scale = parseFloat(Number(scale - 0.1).toFixed(1))
                const _scalePercentage =  100 + (_scale * 100);
                changeState(_ => ({
                    scale: _scale, scalePercent: _scalePercentage,
                    canZoomIn: true, canZoomOut: _scale > 0,
                    isZoomed: _scale >= 1.0
                }))
            }
        } catch (error) { }
    }, [scale])
    const resetZoom = useCallback(() => changeState(_ => ({
        scale: 0.1,
        scalePercent: 100,
        isZoomed: false,
        canZoomIn: true, canZoomOut: false
    })), [])
    const changeScale = useCallback((scaleFactor?: number) => changeState(_ => ({ scale: Math.fround(scaleFactor ?? 0.1) })), [])

    return { scale, scalePercent, isLoading, isFailed, isZoomed, changeScale, zoomIn, zoomOut, resetZoom, canZoomIn, canZoomOut }
}
