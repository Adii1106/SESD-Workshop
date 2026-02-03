import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: "Authentication required" })}
    

    try {
        const decoded = jwt.verify(token, 'simple-secret-key-123')
            // @ts-ignore 
        req.user = decoded
        next()

    } catch (err){
        return res.status(401).json({ message: "Invalid token" })
    }
};
