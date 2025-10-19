import { Router, type Request, type Response, type RequestHandler } from "express";

function asyncHandler(fn: RequestHandler<any, any, any, any>): RequestHandler<any, any, any, any> {
    return function (req, res, next) {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}

class _DefaultRouter {
    private readonly routerInstance: Router = Router();
    private readonly defaultRoute: string;

    constructor(defaultRoute: string = "/") {
        this.defaultRoute = defaultRoute.startsWith("/") ? defaultRoute : `/${defaultRoute}`;
    }

    get router(): Router {
        return this.routerInstance;
    }

    public get(pathOrHandler?: string | RequestHandler, handler?: RequestHandler): void {
        this.addRoute("get", pathOrHandler, handler);
    }

    public post(pathOrHandler?: string | RequestHandler, handler?: RequestHandler): void {
        this.addRoute("post", pathOrHandler, handler);
    }

    public put(pathOrHandler?: string | RequestHandler, handler?: RequestHandler): void {
        this.addRoute("put", pathOrHandler, handler);
    }

    public delete(pathOrHandler?: string | RequestHandler, handler?: RequestHandler): void {
        this.addRoute("delete", pathOrHandler, handler);
    }

    public patch(pathOrHandler?: string | RequestHandler, handler?: RequestHandler): void {
        this.addRoute("patch", pathOrHandler, handler);
    }

    private addRoute(
        method: "get" | "post" | "put" | "delete" | "patch",
        pathOrHandler?: string | RequestHandler,
        maybeHandler?: RequestHandler
    ): void {
        const path = typeof pathOrHandler === "string"
        ? (pathOrHandler.startsWith("/") ? this.defaultRoute + pathOrHandler : this.defaultRoute + `/${pathOrHandler}`)
        : this.defaultRoute;

        const handler = typeof pathOrHandler === "function"
        ? pathOrHandler
        : maybeHandler ?? this.defaultHandler(method.toUpperCase(), path);

        this.routerInstance[method](path, asyncHandler(handler));
    }

    private defaultHandler(method: string, path: string): RequestHandler {
        return (_req: Request, res: Response) => {
        res.send(`${method} request to ${path}`);
        };
    }
}

export { _DefaultRouter, asyncHandler };