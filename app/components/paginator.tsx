import { FetcherWithComponents, useLocation } from "@remix-run/react";
import { memo, useCallback, useState } from "react";
import { HiChevronLeft } from "react-icons/hi";

type TProps = {
    term?: string;
    page: number;
    nextAriaLabel: string;
    disableNext?: boolean;
    previousAriaLabel: string;
    disablePrevious?: boolean;
    fetcher: FetcherWithComponents<any>
}

export const Paginator = memo(function Paginator({ fetcher, page, term, nextAriaLabel, previousAriaLabel, disableNext, disablePrevious, }: TProps) {
    const [pageIndex, set] = useState(page)
    const path = useLocation().pathname;

    const loadMore = useCallback((page: number) => {
        set(page);
        fetcher.load(path, {flushSync: false})
    }, [page, path])

    return (<fetcher.Form className='flex my-10' aria-label={'Paginated data'}>
        <button name="page" value={pageIndex} aria-label={previousAriaLabel} onClick={() => loadMore(page - 1)}
            disabled={disablePrevious} className="hover:motion-preset-pulse-sm active:motion-preset-compress disabled:pointer-events-none disabled:opacity-30 p-4">
            <HiChevronLeft />
        </button>
        <button name="page" value={pageIndex} aria-label={nextAriaLabel} onClick={() => loadMore(page + 1)}
            disabled={disableNext} className="hover:motion-preset-pulse-sm active:motion-preset-compress disabled:pointer-events-none disabled:opacity-30 p-4 bg-white text-sm font-thin flex gap-3 items-center border-none" >
            Load More
        </button>
        <input type="hidden" name={'term'} value={term} />
    </fetcher.Form>)
})
