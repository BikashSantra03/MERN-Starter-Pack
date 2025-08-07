import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { endpoints } from "../services/apis";
import { apiConnector } from "../services/apiConnector";

import { setToken } from "../store/slices/authSlice";
import { setUser } from "../store/slices/profileSlice";

const { LOGIN_API } = endpoints;

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    // State to trigger query manually
    const [enabled, setEnabled] = useState(false);

    // useQuery for API call
    const { data, isLoading, error } = useQuery({
        queryKey: ["login", email, password],
        queryFn: async () => {
            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password,
            });
            return response.data;
        },
        enabled,
        onSuccess: (result) => {
            if (result.success) {
                // Set token and user data in the Redux store
                dispatch(setToken(result.token));
                const userImage = result?.existingUser?.image
                    ? result.existingUser.image
                    : `https://api.dicebear.com/5.x/initials/svg?seed=${result.existingUser.firstName} ${result.existingUser.lastName}`;

                dispatch(setUser({ ...result.existingUser, image: userImage }));

                // Store token and user in localStorage
                localStorage.setItem("Token", JSON.stringify(result.token));
                localStorage.setItem("user", JSON.stringify(result.existingUser));

                toast.success("Login successful!");
                navigate("/dashboard");
            } else {
                toast.error(result.message || "Login failed");
            }
            setEnabled(false);
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message || "An error occurred");
            setEnabled(false);
        },
    });

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Please fill in all fields");
            return;
        }
        setEnabled(true); // Trigger the query
    };

    const handleOnChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className="login-page">
            <h2>Login</h2>
            <form onSubmit={handleOnSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleOnChange}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleOnChange}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;