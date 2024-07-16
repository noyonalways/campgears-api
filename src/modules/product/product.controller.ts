import httpStatus from "http-status";
import { catchAsync, sendResponse } from "../../utils";
import { productService } from "./product.service";

const getAll = catchAsync(async (req, res) => {
  const products = await productService.getAll();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Products fetched successfully",
    data: products,
  });
});

const create = catchAsync(async (req, res) => {
  const product = await productService.create(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Product created successfully",
    data: product,
  });
});

const getSingle = catchAsync(async (req, res) => {
  const { id } = req.params;
  const product = await productService.getProductByProperty("_id", id);
  if (!product) {
    return sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "Product not found",
      data: undefined,
    });
  }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product fetched successfully",
    data: product,
  });
});

const update = catchAsync(async (req, res) => {
  const { id } = req.params;
  const product = await productService.update(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product updated successfully",
    data: product,
  });
});

const deleteSingle = catchAsync(async (req, res) => {
  const { id } = req.params;
  const product = await productService.deleteSingle(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product deleted successfully",
    data: product,
  });
});

export const productController = {
  getAll,
  create,
  getSingle,
  update,
  deleteSingle,
};
