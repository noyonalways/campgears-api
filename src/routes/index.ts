import { Router } from "express";
import discountRoutes from "../modules/discount/discount.routes";
import orderRoutes from "../modules/order/order.routes";
import productRoutes from "../modules/product/product.routes";
const router: Router = Router();

const moduleRoutes = [
  {
    path: "/products",
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
];

moduleRoutes.forEach(({ path, routes }) => {
  router.use(path, routes);
});

export default router;
