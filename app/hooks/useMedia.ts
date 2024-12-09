import { useEffect, useState } from "react";

type Media = 'small' | 'medium' | 'larger'
export function useMedia() {
    const [media, set] = useState('' as Media)

    useEffect(() => {
        const medias = ['(min-width: 60em)', '(min-width: 40em) and (max-width: 60em)', '(max-width: 40em)',].map(query => {
            const mq = matchMedia(query);
            set(checkMedia(mq.media, mq.matches).media as Media)
            mq.addEventListener('change', onMediaChange)
            return mq;
        })
        return (() => medias.forEach(m => m.removeEventListener('change', onMediaChange)))
    }, [media])

    function checkMedia(media: string, matches: boolean) {
        if (media === '(max-width: 40em)' && matches) return ({ media: 'small' })
        else if (media === '(min-width: 40em) and (max-width: 60em)' && matches) return ({ media: 'medium' })
        else if (media === '(min-width: 60em)' && matches) { return ({ media: 'larger' }) }
        else return {media: 'larger'}
    }

    function onMediaChange({ media, matches }: MediaQueryListEvent) {
        set(checkMedia(media, matches).media as Media)
    }
    return { media, checkMedia }
}
