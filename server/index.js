const express = require("express");
const fileUpload = require("express-fileupload");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("colors");

const { dbConnect } = require("./config/database");
const { cloudinaryConnect } = require("./config/cloudinaryDB");


const userRoutes = require("./routes/User");
const ProfileRoutes = require("./routes/Profile");

const PORT = process.env.PORT || 8000;

const app = express();

//middlewares
app.use(express.json());

app.use(cookieParser());

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "./public/",
    })
);

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true, // Allow sending cookies across origins (if needed)
        allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    })
);


//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", ProfileRoutes);

//default API
app.get("/", (req, res) => {
    res.send("<h1>Server is up and running</h1>");
});

//activatating server
app.listen(PORT, () => {
    console.log(`Server running at PORT ${PORT}`.blue);
});

//database connection
dbConnect();
cloudinaryConnect();
