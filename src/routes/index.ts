import { Router } from "express";
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
];

moduleRoutes.forEach(({ path, routes }) => {
  router.use(path, routes);
});

export default router;
