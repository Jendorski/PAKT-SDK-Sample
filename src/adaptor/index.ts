/* eslint-disable no-useless-catch */
import { NextFunction, Request, Response } from "express";

interface ControllerInterface {
  (req: Request, res: Response, next?: NextFunction): unknown;
}

const controllerWrapper = (controller: ControllerInterface) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (error: Error | unknown) {
      console.error({ error });
      throw next(error);
    }
  };
};

export default controllerWrapper;
