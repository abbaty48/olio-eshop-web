import { prismaDB } from '../db.server';
import { Profile } from '@prisma/client';
import { Identity } from '~/modules/types';
import { Authenticator } from "remix-auth";
import { setVisitorCookie } from './visitor';
import { Auth0Strategy } from "remix-auth-auth0";
import { createCookieSessionStorage, redirect } from '@remix-run/node'

const sessionSecret = process.env.SESSION_SECRET
if (!sessionSecret) throw new Error("SESSION SECRET ENV must be set in-other to proceed.");

const sessionStorage = createCookieSessionStorage({
    cookie: {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        name: '__session_olio',
        maxAge: 60 * 60 * 24 * 7,
        secrets: [sessionSecret],
        secure: process.env.NODE_ENV === 'production',
    }
})

export const authenticator = new Authenticator<Identity | null>(sessionStorage);
authenticator.use(new Auth0Strategy<Identity | null>({
    domain: process.env.AUTH0_DOMAIN ?? '',
    clientID: process.env.AUTH0_CLIENT_ID ?? '',
    clientSecret: process.env.AUTHO_CLIENT_SECRET ?? '',
    callbackURL: process.env.AUTH0_CALLBACK ?? '',
}, async ({ accessToken, refreshToken, extraParams, profile }) => {
    if (profile.emails && profile.emails?.length) {
        const customer = await upsertCustomer(profile.emails[0].value);
        if (customer) {
            return {
                ...customer,
                ...customer?.profile,
                id: customer.id
            } as Identity
        }
    }
    return null
}))

async function upsertCustomer(email: string, profile?: Omit<Profile, 'id'>) {
    switch (!!profile) {
        case true: {
            return await prismaDB.customer.upsert({
                where: { email },
                create: {
                    email,
                    name: profile?.name ?? profile?.given_name ?? profile?.nickname,
                    profile: {
                        connectOrCreate: {
                            where: { id: '', email },
                            create: { ...profile, email, email_verified: profile?.email_verified ?? true }
                        }
                    }
                },
                update: {
                    email,
                    name: profile?.name ?? profile?.given_name ?? profile?.nickname,
                    profile: {
                        upsert: {
                            update: { ...profile },
                            create: { ...profile, email, email_verified: profile?.email_verified ?? true }
                        }
                    }
                },
                include: { profile: true }
            });
        }
        case false: {
            return await prismaDB.customer.upsert({
                where: { email },
                create: { email },
                update: { email },
                include: { profile: true }
            });
        }
        default: return null
    }
}

export async function getIdentity(request: Request): Promise<Identity | null> {
    return await authenticator.isAuthenticated(request)
}

export async function authorize(request: Request) {
    try {
        const identity = await authenticator.isAuthenticated(request);
        if (!identity) {
            throw redirect('/auth/login', { headers: await setVisitorCookie({ redirectUrl: request.url }) })
        }
        return identity
    } catch (error) {
        throw redirect('/auth/login', { headers: await setVisitorCookie({ redirectUrl: request.url }) })
    }
}

export async function visitorRoute(request: Request) {
    if (!await getIdentity(request)) {
        redirect(request.url, (request.url, { headers: await setVisitorCookie({ redirectUrl: request.url }) }))
    }
}
