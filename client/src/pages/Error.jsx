import React, { useEffect } from "react";
import { useNavigate } from "react-router";

const Error = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate(-1);
        }, 2000);

        // Cleanup the timer when the component unmounts
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="flex justify-center items-center text-3xl ">
            <h2>Error - 404 Not Found</h2>
        </div>
    );
};

export default Error;
