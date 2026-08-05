import { Request, Response, NextFunction } from "express";
import { UserRoles } from "../models/user";
import formidable from "formidable";
import { body } from "express-validator";

export const hasRole = (...roles: UserRoles[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: 'Acceso no autorizado'
            });
        }

        next();
    };
};

export function parseImage(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const form = formidable({
        multiples: false,
        maxFiles: 1,
        maxFileSize: 5 * 1024 * 1024, // 5 MB
        filter: ({ mimetype }) =>
            [
                "image/jpeg",
                "image/jpg",
                "image/png",
                "image/webp",
            ].includes(mimetype ?? ""),
    });

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                message: "No fue posible procesar la imagen.",
            });
        }

        req.files = files;

        next();
    });
}
