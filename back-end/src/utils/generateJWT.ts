import { Types } from "mongoose"
import jwt from "jsonwebtoken"
import { AuthType } from "../middlewares/UserMiddlewares"

type UserPayload = {
    id: Types.ObjectId
    type: AuthType
}

export const generateJWT = (user: UserPayload): string => {
    const token= jwt.sign(
        user,
        process.env.JWT_SECRET as string,
        { expiresIn: "180d" }
    );
    return token;
}