import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import discountRoutes from "../modules/discount/discount.routes";
import faqQuestionRoutes from "../modules/faq-question/faqQuestion.routes";
import orderRoutes from "../modules/order/order.routes";
import paymentRoutes from "../modules/payment/payment.routes";
import productRoutes from "../modules/product/product.routes";
import reviewRoutes from "../modules/review/review.routes";
import userRoutes from "../modules/user/user.routes";

const router: Router = Router();

interface IModuleRoute {
  path: string;
  routes: Router;
}

const moduleRoutes: IModuleRoute[] = [
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
    path: "/payments",
    routes: paymentRoutes,
  },
  {
    path: "/auth",
    routes: authRoutes,
  },
  {
    path: "/users",
    routes: userRoutes,
  },
];

moduleRoutes.forEach(({ path, routes }) => {
  router.use(path, routes);
});

export default router;
