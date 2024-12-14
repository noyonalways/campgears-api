import { Response } from "express";
import { TResponse } from "../interface/sendResponse.interface";

const sendResponse = <T>(res: Response, responseData: TResponse<T>) => {
  res.status(responseData.statusCode).json({
    success: responseData.success,
    statusCode: responseData.statusCode,
    message: responseData.message,
    data: responseData.data,
    meta: responseData.meta,
  });
};

export default sendResponse;
