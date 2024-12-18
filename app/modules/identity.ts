import { useRouteLoaderData } from "@remix-run/react";
import { Identity } from "~/modules/types";
import { loader } from "~/root";

export function useIdentity(): Identity | null {
    return useRouteLoaderData<typeof loader>('root')?.identity as Identity | null
}
