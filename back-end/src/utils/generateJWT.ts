import { Types } from "mongoose"
import jwt from "jsonwebtoken"

type UserPayload = {
    id: Types.ObjectId
}

export const generateJWT = (user: UserPayload): string => {
    const token= jwt.sign(user, process.env.JWT_SECRET as string, { expiresIn: '180d' });
    return token;
}