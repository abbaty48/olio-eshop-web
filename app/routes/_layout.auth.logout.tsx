import { authenticator } from "~/modules/.servers/session/auth"
import { ActionFunctionArgs, redirect } from "@remix-run/node";

export async function loader() {
    throw redirect('/')
}

export async function action({ request }: ActionFunctionArgs) {
    await authenticator.logout(request, { redirectTo: '/' });
}
