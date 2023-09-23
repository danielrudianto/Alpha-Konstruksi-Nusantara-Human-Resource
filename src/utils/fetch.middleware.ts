import { NextFunction, Request, Response } from "express";

class FetchMiddleware {
  static page = (req: Request, res: Response, next: NextFunction) => {
    const page = !req.query.page ? 1 : parseInt(req.query.page as string);
    const keyword = !req.query.keyword
      ? ""
      : decodeURIComponent(req.query.keyword as string);

    req.body.page = page;
    req.body.keyword = keyword;

    next();
  };
}
