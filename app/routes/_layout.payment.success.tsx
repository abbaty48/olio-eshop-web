import { retrievePaymentIntent } from "~/modules/.servers/payment";
import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { BsFillCheckCircleFill } from "react-icons/bs";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url)
    const id = url.searchParams.get('payment_intent')
    if (!id) throw redirect('/payment/failed')
    return await retrievePaymentIntent(id)
    /*  return {
         "id": "pi_3QZLPaC1SZl8SreC0LiB47Ro",
         "object": "payment_intent",
         "amount": 2000,
         "amount_capturable": 0,
         "amount_details": {
             "tip": {}
         },
         "amount_received": 2000,
         "application": null,
         "application_fee_amount": null,
         "automatic_payment_methods": {
             "allow_redirects": "always",
             "enabled": true
         },
         "canceled_at": null,
         "cancellation_reason": null,
         "capture_method": "automatic_async",
         "client_secret": "pi_3QZLPaC1SZl8SreC0LiB47Ro_secret_gYyzExTB9iiinGzYvw6Z259oJ",
         "confirmation_method": "automatic",
         "created": 1734997906,
         "currency": "usd",
         "customer": null,
         "description": null,
         "invoice": null,
         "last_payment_error": null,
         "latest_charge": "ch_3QZLPaC1SZl8SreC0P3CGZ7w",
         "livemode": false,
         "metadata": {},
         "next_action": null,
         "on_behalf_of": null,
         "payment_method": "pm_1QZLiFC1SZl8SreCpM5aGOop",
         "payment_method_configuration_details": {
             "id": "pmc_1QZJ13C1SZl8SreCVA8seAeL",
             "parent": null
         },
         "payment_method_options": {
             "card": {
                 "installments": null,
                 "mandate_options": null,
                 "network": null,
                 "request_three_d_secure": "automatic"
             },
             "link": {
                 "persistent_token": null
             }
         },
         "payment_method_types": [
             "card",
             "link"
         ],
         "processing": null,
         "receipt_email": null,
         "review": null,
         "setup_future_usage": null,
         "shipping": null,
         "source": null,
         "statement_descriptor": null,
         "statement_descriptor_suffix": null,
         "status": "succeeded",
         "transfer_data": null,
         "transfer_group": null
     } */
}

export default function () {
    const paymentIntent = useLoaderData<typeof loader>()
    return <article className="m-4 grid place-items-center h-full">
        <div className="bg-white min-h-[50vh] text-center flex flex-col items-center p-5 gap-10">
            <BsFillCheckCircleFill className={'fill-green-300 size-30'} />
            <h1 className="font-light">Payment Success</h1>
            <p className="text-2xl p-2 font-light">You have made it, we've received your payment of <strong className="text-orange-300 text-xl">{Intl.NumberFormat('en-US', { currency: 'USD', style: 'currency', maximumFractionDigits: 0 }).format(paymentIntent.amount)} </strong>for the below items. Thank you.</p>
            <p>You can track your order on the <Link to={'/order'} className="text-primary">Order</Link>, or navigate to <Link to={'/'} className="text-primary">Home page</Link>, <Link to={'/products'} className="text-primary">Products</Link>,<Link to={'/checkouts'} className="text-primary">Checkout</Link></p>
        </div>
    </article >
}
