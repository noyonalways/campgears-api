import { Router } from "express";
import productRoutes from "../modules/product/product.routes";
const router: Router = Router();

const moduleRoutes = [
  {
    path: "/products",
    routes: productRoutes,
  },
];

moduleRoutes.forEach(({ path, routes }) => {
  router.use(path, routes);
});

export default router;
