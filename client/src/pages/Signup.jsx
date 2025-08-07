import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { endpoints } from "../services/apis";
import { apiConnector } from "../services/apiConnector";

const { SIGNUP_API } = endpoints;

const Signup = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        accountType: "",
        firstName: "",
        lastName: "",
        email: "",
        contactNumber: "",
        password: "",
        confirmPassword: "",
        otp: "",
    });

    const {
        accountType,
        firstName,
        lastName,
        email,
        contactNumber,
        password,
        confirmPassword,
    } = formData;

    const mutation = useMutation({
        mutationFn: async () => {
            const response = await apiConnector("POST", SIGNUP_API, {
                firstName,
                lastName,
                email,
                contactNumber,
                password,
                confirmPassword,
                accountType,

            });
            return response.data;
        },
        onSuccess: (result) => {
            if (result.success) {
                toast.success(result.message || "Signup successful!");
                navigate("/login"); // Navigate to login page after signup
            } else {
                toast.error(result.message || "Signup failed");
            }
        },
        onError: (err) => {
            toast.error(err?.response?.data?.message || "An error occurred during signup");
        },
    });

    const handleOnSubmit = (e) => {
        e.preventDefault();
        // Client-side validation
        if (
            !accountType ||
            !firstName ||
            !lastName ||
            !email ||
            !contactNumber ||
            !password ||
            !confirmPassword

        ) {
            toast.error("Please fill in all fields");
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        mutation.mutate();
    };

    const handleOnChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className="signup-page">
            <h2>Sign Up</h2>
            <form onSubmit={handleOnSubmit}>
                <div>
                    <label>Account Type:</label>
                    <select
                        name="accountType"
                        value={accountType}
                        onChange={handleOnChange}
                        required
                    >
                        <option value="">Select Account Type</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        {/* Add more account types as needed */}
                    </select>
                </div>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={firstName}
                        onChange={handleOnChange}
                        placeholder="Enter your first name"
                        required
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastName"
                        value={lastName}
                        onChange={handleOnChange}
                        placeholder="Enter your last name"
                        required
                    />
                </div>
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
                    <label>Contact Number:</label>
                    <input
                        type="tel"
                        name="contactNumber"
                        value={contactNumber}
                        onChange={handleOnChange}
                        placeholder="Enter your contact number"
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
                <div>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleOnChange}
                        placeholder="Confirm your password"
                        required
                    />
                </div>
                <button type="submit" disabled={mutation.isLoading}>
                    {mutation.isLoading ? "Signing up..." : "Sign Up"}
                </button>
            </form>
        </div>
    );
};

export default Signup;