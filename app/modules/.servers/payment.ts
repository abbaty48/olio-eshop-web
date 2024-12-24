import { Stripe } from "stripe";
import { TCart } from "../types";

const stripe = new Stripe(process.env.STRIPE_SECKEY ?? '')
type TPaymentInformation = {
    amount: number,
    customerId: string,
    customerEmail: string,
    shipping: TShipping
}
type TShipping = {
    address: { city: string, country: string, line1: string, line2: string, state: string, postal_code: string },
    phone: string,
    name: string
}
export async function createIntentPayment() {
    return stripe.paymentIntents.create({
        amount: 2000,
        currency: 'usd',
    })
}
/* export async function createIntentPayment({ amount, customerId: customer, customerEmail, shipping }: TPaymentInformation) {
    return stripe.paymentIntents.create({
        amount,
        customer,
        currency: 'usd',
        shipping,
        receipt_email: customerEmail,
    })
} */

export async function retrievePaymentIntent(paymentId: string) {
    return await stripe.paymentIntents.retrieve(paymentId)
}
