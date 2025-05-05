"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FetchMiddleware {
}
FetchMiddleware.page = (req, res, next) => {
    const page = !req.query.page ? 1 : parseInt(req.query.page);
    const keyword = !req.query.keyword
        ? ""
        : decodeURIComponent(req.query.keyword);
    req.body.page = page;
    req.body.keyword = keyword;
    next();
};
