import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import { createIntentPayment } from "~/modules/.servers/payment";
import { LoaderFunctionArgs } from "@remix-run/node";
import { loadStripe } from "@stripe/stripe-js";
import { PiSpinner } from "react-icons/pi";
import React from "react";

const stripePromise = loadStripe('pk_test_FDLygkxMicqnsN4EeYjBSxHY00YiaxnQgt')
/*  */
export const loader = async ({ request }: LoaderFunctionArgs) => await createIntentPayment()
/*  */
const StripeForm = () => {
    const elements = useElements()
    const stripe = useStripe()

    // handling the payment response from the client side
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (stripe && elements) {
            await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: 'http://localhost:5173/payment/success'
                }
            })
        }
    }

    return (<Form onSubmit={handleSubmit}>
        <PaymentElement />
        <button className={'w-full py-4 text-center my-2 bg-primary text-white rounded-none hover:bg-opacity-35 hover:cursor-pointer'}>Pay</button>
    </Form>)
}
/*  */
export default function StripePayment() {
    const navigation = useNavigation()
    const paymentIntent = useLoaderData<typeof loader>()

    return (navigation.state !== 'idle') ?
        <div className="h-full sticky top-1/2 grid place-items-center"> <PiSpinner className="animate-spin" /></div> :
        (
            <Elements stripe={stripePromise} options={{
                loader: 'always', clientSecret: paymentIntent.client_secret!
            }}>
                <StripeForm />
            </Elements >
        )
}

export function ErrorBoundary() {
    return <p className="my-4 p-3 text-center text-xl">
        Oops, something went wrong here, a payment form should've shown here, but
        there must be a network error occur, please try reload the page, sorry
        for the inconvenience.
    </p>
}
