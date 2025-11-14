import Stripe from "stripe";
// Placeholder imports for other payment methods
// import { sendTRC20 } from "./tronwebUtils";
// import { sendPayPalPayout } from "./paypalUtils";
// import { sendSkrill } from "./skrillUtils";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function handler(event, context) {
  try {
    const { userId, amount, branchCode, method, addressOrAccount } = JSON.parse(event.body);

    let payoutResult;

    switch(method) {
      case "bank":
        payoutResult = await stripe.payouts.create({
          amount: Math.round(amount * 100),
          currency: "zar",
          metadata: { branchCode }
        }, { stripeAccount: process.env.STRIPE_CONNECTED_ACCOUNT });
        break;
      case "usdt-trc20":
        payoutResult = { message: "TRC20 payout placeholder", address: addressOrAccount, amount };
        break;
      case "paypal":
        payoutResult = { message: "PayPal payout placeholder", address: addressOrAccount, amount };
        break;
      case "skrill":
        payoutResult = { message: "Skrill payout placeholder", address: addressOrAccount, amount };
        break;
      default:
        return { statusCode: 400, body: JSON.stringify({ message: "Invalid payout method" }) };
    }

    return { statusCode: 200, body: JSON.stringify({ status: true, payout: payoutResult }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ status: false, message: err.message }) };
  }
}
