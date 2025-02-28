import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../Api";

const ForgotPassword = () => {
    const { handle } = useParams();  // Check if it's a "bank" or "user"
    const navigate = useNavigate();
    
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [step, setStep] = useState(1); // Step 1: Enter phone/email, Step 2: Verify OTP

    // Step 1: Request OTP
    const requestOTP = async () => {
        try {
            await axios.post(`/auth/forgot-password`, { phone });
            alert("OTP sent to your registered phone/email.");
            setStep(2);
        } catch (err) {
            alert(err.response.data.errorMessage);
        }
    };

    // Step 2: Verify OTP and Reset Password
    const resetPassword = async () => {
        try {
            await axios.post(`/auth/reset-password`, { phone, otp, password });
            alert("Password reset successfully! Please log in.");
            navigate(`/login/${handle}`);
        } catch (err) {
            alert(err.response.data.errorMessage);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>

                {step === 1 ? (
                    <>
                        <label className="block font-semibold">Enter Phone Number</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded mb-3"
                            placeholder="Enter registered phone/email"
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                        <button className="w-full bg-blue-500 text-white py-2 rounded" onClick={requestOTP}>
                            Send OTP
                        </button>
                    </>
                ) : (
                    <>
                        <label className="block font-semibold">Enter OTP</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded mb-3"
                            placeholder="Enter OTP"
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                        <label className="block font-semibold">New Password</label>
                        <input
                            type="password"
                            className="w-full p-2 border rounded mb-3"
                            placeholder="Enter new password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button className="w-full bg-green-500 text-white py-2 rounded" onClick={resetPassword}>
                            Reset Password
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
