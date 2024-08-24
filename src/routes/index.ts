import { Router } from "express";
import discountRoutes from "../modules/discount/discount.routes";
import faqQuestionRoutes from "../modules/faq-question/faqQuestion.routes";
import orderRoutes from "../modules/order/order.routes";
import paymentRoutes from "../modules/payment/payment.routes";
import productRoutes from "../modules/product/product.routes";
import reviewRoutes from "../modules/review/review.routes";

const router: Router = Router();

const moduleRoutes = [
  {
    path: "/products", // review
    routes: reviewRoutes,
  },
  {
    path: "/products", // product
    routes: productRoutes,
  },
  {
    path: "/orders",
    routes: orderRoutes,
  },
  {
    path: "/discounts",
    routes: discountRoutes,
  },
  {
    path: "/faq-questions",
    routes: faqQuestionRoutes,
  },
  {
    path: "/payment",
    routes: paymentRoutes,
  },
];

moduleRoutes.forEach(({ path, routes }) => {
  router.use(path, routes);
});

export default router;
