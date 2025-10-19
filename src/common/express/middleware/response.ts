import { type Request, type Response, type NextFunction } from "express";

type T_STATUS = "Success" | "Failed" | "Paying";

type T_CODE = -1 | 1 | 4;
// -1 - неуспешный ответ
//  1 - успешный ответ
//  4 - процесс оплаты 

export function responseHandler(req: Request, res: Response, next: NextFunction) {
    // Сохраняем оригинальный метод .json()
    const originalJson = res.json;

    res.json = (body: any) => {
        // Если ответа нет в body, добавляем стандартное поле statusCode
        const statusCode = res.statusCode || 200;

        let code: T_CODE = statusCode >= 400 ? -1 : 1;
        let status: T_STATUS = statusCode >= 400 ? "Failed" : "Success";

        if(typeof body === "object" && 'fee' in body) {
            status = "Paying";
            code = 4;
        }


        // Строим новый ответ
        return originalJson.call(res, {
            data: body,
            code,
            status,
        });
    };

    next(); // передаём в следующий middleware или роут
}
