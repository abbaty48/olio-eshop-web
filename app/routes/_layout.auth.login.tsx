import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from '@remix-run/node';
import { authenticator } from "~/modules/.servers/session/auth"

export async function loader({ request }: LoaderFunctionArgs) {
    const identifier = await authenticator.isAuthenticated(request)
    return (identifier) ? redirect('/') : await authenticator.authenticate('auth0', request, {
        successRedirect: '/',
        failureRedirect: '/'
    })
}

export async function action({ request }: ActionFunctionArgs) {
    return await authenticator.authenticate('auth0', request, {
        successRedirect: '/',
        failureRedirect: '/'
    })
}
