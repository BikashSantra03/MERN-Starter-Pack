
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { signupSuccessEmail } = require("../services/mail/templates/signupEmail");
const mailSender = require("../utils/mailSender");

require("dotenv").config();


// hash the password
async function hashThePassword(password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
        console.error("Error while Encrypting Password:", error);
        throw new Error("Error while encrypting password");
    }
}

// Sign Up
exports.signUp = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            contactNumber,
            password,
            confirmPassword,
            accountType,
        } = req.body;

       
        //data validation
        if (
            !firstName ||
            !lastName ||
            !email ||
            !contactNumber ||
            !password ||
            !confirmPassword
        ) {
            return res.status(403).json({
                success: false,
                message: "All fields are reqired!",
            });
        }
         


        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message:
                    "Password and ConfirmPassword value does not match! Please try again",
            });
        }

        //check new user or not
        const isOldUser = await User.findOne({ email });

        if (isOldUser) {
            return res.status(401).json({
                success: false,
                message: "You are already a registered user. Please do Login",
            });
        }


        //hash the password
        const hashedPassword = await hashThePassword(password);

        //Create User entry in DB
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            accountType,
            image: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&size=128&background=0D8ABC&color=fff&rounded=true`,
        });

        console.log("User details are", newUser);

        //send mail to user
        const mailResponse = await mailSender(
            newUser.email,
            "SignUp Successful",
            signupSuccessEmail(newUser.firstName)
        );

        return res.status(200).json({
            success: true,
            message: "User registered Succesfully",
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //validate Data
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "PLease fill all the details carefully",
            });
        }

        //check Existing User or not
        let existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(401).send({
                success: false,
                message: "User is not registered",
            });
        }

        //generate JWT token after password is matched

        if (await bcrypt.compare(password, existingUser.password)) {
            //generate JWT token
            const payload = {
                email: existingUser.email,
                id: existingUser._id,
                role: existingUser.accountType,
            };

            let token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });

            //add token with user object
            existingUser.token = token;
            existingUser.password = undefined;

            //send response with JWT in cookie
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };

            res.cookie("Token", token, options).status(200).send({
                success: true,
                token,
                existingUser,
                message: "User Logged in successfully",
            });
        } else {
            //passwsord does not match
            return res.status(403).json({
                success: false,
                message: "Password Incorrect",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Login failed! Please try again later!",
        });
    }
};
