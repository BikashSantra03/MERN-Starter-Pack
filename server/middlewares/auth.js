
require("dotenv").config();
const jwt = require("jsonwebtoken");


exports.auth = async (req, res, next) => {
    try {
        const token =
            req?.cookies?.Token ||
            req?.body?.Token ||
            req.header("Authorization").replace("Bearer ", "");

        //console.log("Token: ", token);
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized! No token provided",
            });
        }
        console.log("token present", token)

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            console.log("auth success");

            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized! Invalid token",
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error in Authorization",
        });
    }
};

//isStudent middleware
exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.role !== "Student") {
            return res.status(403).json({
                success: false,
                message: "Forbidden! You are not a student",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

//isAdmin middleware
exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.role !== "Admin") {
            return res.status(403).json({
                success: false,
                message: "Forbidden! You are not an admin",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
