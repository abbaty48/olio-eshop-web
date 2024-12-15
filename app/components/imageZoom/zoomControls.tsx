import { GoZoomIn, GoZoomOut } from "react-icons/go";
import { memo, PropsWithChildren } from "react"
import { TbZoomReset } from "react-icons/tb";

const ZoomButton = memo(function ZoomButton(props: { title: string, 'aria-label': string, disabled: boolean, onClick: React.MouseEventHandler<HTMLButtonElement> } & PropsWithChildren) {
    return (
        <button type="button" {...props}
            className="disabled:pointer-events-none disabled:opacity-15 cursor-pointer hover:scale-90 transition-all">
            {props.children}
        </button>
    )
})

type TProps = {
    isFailed: boolean,
    isZoomed: boolean,
    canZoomIn: boolean,
    canZoomOut: boolean,
    zoomIn: React.MouseEventHandler<HTMLButtonElement>,
    zoomOut: React.MouseEventHandler<HTMLButtonElement>,
    resetZoom: React.MouseEventHandler<HTMLButtonElement>,
}

export const ZoomControls = memo(function ZoomControls(props: TProps) {
    const { isFailed, isZoomed, canZoomIn, canZoomOut, zoomIn, zoomOut, resetZoom } = props
    return (<menu className={`flex gap-8 p-4 max-w-max text-2xl md:text-3xl order-1 md:order-none ${!props.isFailed && 'bg-c1'}`}>
        <ZoomButton title="Reset Zooming" aria-label="Reset zooming to the default"
            disabled={!isZoomed || isFailed} onClick={resetZoom}>
            <TbZoomReset stroke="#818181" />
        </ZoomButton>
        <ZoomButton title={'Zoom in'} aria-label="Zoom in"
            disabled={!canZoomIn || isFailed} onClick={zoomIn}>
            <GoZoomIn fill="#818181" />
        </ZoomButton>
        <ZoomButton title={'Zoom out'} aria-label="Zoom out" disabled={!canZoomOut || isFailed} onClick={zoomOut}>
            <GoZoomOut fill="#818181" />
        </ZoomButton>
    </menu>
    )
})
