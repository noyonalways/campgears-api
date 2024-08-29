import Stripe from "stripe";
import config from "../../config";
import { IOrderItem } from "../order/order.interface";
const stripe = new Stripe(config.strip_secret_key as string);

interface IPaymentInput {
  items: IOrderItem[];
  customerEmail: string;
  shippingCost: number;
  transactionId: string;
  discountCode?: string;
}

export const initialSession = async (paymentInput: IPaymentInput) => {
  const listItems = paymentInput.items.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
        },

        unit_amount: Math.floor(item.price * 100),
      },
      quantity: item.quantity,
    };
  });

  const successUrl = `${config.client_base_url}/payment/confirmation?transactionId=${paymentInput.transactionId}&sessionId={CHECKOUT_SESSION_ID}&email=${paymentInput.customerEmail}`;
  const cancelUrl = `${config.client_base_url}/payment/order-cancel?transactionId=${paymentInput.transactionId}`;

  const sessionsCreateConfig: Stripe.Checkout.SessionCreateParams = {
    line_items: listItems,
    payment_method_types: ["card"],
    mode: "payment",
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: paymentInput.shippingCost * 100,
            currency: "usd",
          },
          display_name: "Shipping Cost",
        },
      },
    ],
    customer_email: paymentInput.customerEmail,
    success_url: successUrl,
    cancel_url: cancelUrl,
  };

  if (paymentInput?.discountCode) {
    sessionsCreateConfig.discounts = [
      {
        coupon: "nTRr1MRk",
      },
    ];
  }

  const session = await stripe.checkout.sessions.create({
    ...sessionsCreateConfig,
  });

  return session;
};

export const verifyPayment = async (sessionId: string) => {
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  return session;
};
