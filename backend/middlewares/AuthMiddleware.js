import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';
import dotenv from 'dotenv';
dotenv.config();

export const AuthMiddleware = async (req, res, next) => {
    try {
    const token = req.cookies?.token;

    if(!token) {
        return res.status(401).json({
            success: false,
            message: "not authorized"
        })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id).select('-password');
     if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      })
    }
    req.user = user;
    next();
    } catch (error) {
        console.error("Auth middleware error: ", error);
        return res.status(500).json({
            success: false,
            message: "Server error in authentication"
        })
    }
    
}