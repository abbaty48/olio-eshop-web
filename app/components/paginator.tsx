import { FetcherWithComponents, useLocation } from "@remix-run/react";
import { HiChevronLeft } from "react-icons/hi";
import { useCallback, useState } from "react";

type TProps = {
    nextAriaLabel: string;
    disableNext?: boolean;
    previousAriaLabel: string;
    disablePrevious?: boolean;
    fetcher: FetcherWithComponents<any>
}

export function Paginator({ fetcher, nextAriaLabel, previousAriaLabel, disableNext, disablePrevious, }: TProps) {
    const [page, set] = useState(1)
    const path = useLocation().pathname;

    const loadMore = useCallback((page: number) => {
        set(page);
        fetcher.load(path)
    }, [page, path])

    return (<fetcher.Form className='flex my-10' aria-label={'Paginated data'}>
        <button name="page" value={page} aria-label={previousAriaLabel} onClick={() => loadMore(page - 1)}
            disabled={disablePrevious} className="hover:motion-preset-pulse-sm active:motion-preset-compress disabled:pointer-events-none disabled:opacity-30 p-4">
            <HiChevronLeft />
        </button>
        <button name="page" value={page} aria-label={nextAriaLabel} onClick={() => loadMore(page + 1)}
            disabled={disableNext} className="hover:motion-preset-pulse-sm active:motion-preset-compress disabled:pointer-events-none disabled:opacity-30 p-4 bg-white text-sm font-thin flex gap-3 items-center border-none" >
            Load More
        </button>
    </fetcher.Form >)
}
