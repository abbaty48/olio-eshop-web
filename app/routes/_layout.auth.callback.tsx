import { LoaderFunctionArgs } from "@remix-run/node";
import { authenticator } from "~/modules/.servers/session/auth"
import { getVisitorCookie } from "~/modules/.servers/session/visitor";

export async function loader({ request }: LoaderFunctionArgs) {
    const redirect = (await getVisitorCookie(request)).redirectUrl ?? '/'
    return authenticator.authenticate('auth0', request, {
        successRedirect: redirect,
        failureRedirect: redirect
    })
}
