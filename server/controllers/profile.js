const User = require("../models/user");

//get all User Details
exports.getAllUserDetails = async (req, res) => {
    try {
        const userId = req.user.id;

        const userDetails = await User.findById(userId);

        return res.status(200).json({
            success: true,
            message: "User details retrieved successfully",
            userDetails,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
