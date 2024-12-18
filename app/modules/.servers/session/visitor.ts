import { createCookie } from '@remix-run/node'

const VISITOR_COOKIE_NAME = 'olio-visitor-cookie'
type TVisitorCookie = { redirectUrl?: string }

const { parse, serialize } = createCookie(VISITOR_COOKIE_NAME, { maxAge: 60 * 5 })

export async function getVisitorCookie(request: Request): Promise<TVisitorCookie> {
    const cookie = await parse(request.headers.get('Cookie'))
    return cookie && cookie.redirectUrl ? cookie : { redirectUrl: undefined }
}

export async function setVisitorCookie(data: TVisitorCookie, headers = new Headers()): Promise<Headers> {
    headers.set('Set-Cookie', await serialize(data))
    return headers;
}
