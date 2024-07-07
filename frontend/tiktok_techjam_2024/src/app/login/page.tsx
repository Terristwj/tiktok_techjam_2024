"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import { TextField, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import ConnectWalletButton from "../components/ConnectWalletButton";

export default function Login({
    formState,
    setFormState,
    handleFormChange,
}: {
    formState: any;
    setFormState: any;
    handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    const router = useRouter();
    const [isLoginLoading, setIsLoginLoading] = useState(false);

    const handleLogin = () => {
        setIsLoginLoading(true);

        // Check if all isError fields are valid
        const isValid = Object.keys(formState).every((key) => {
            const field = formState[key];
            // Check if there is no error field
            const noErrorField = !field.error;
            if (noErrorField) {
                return true;
            }

            // Check if isError is false and showError is true
            const fieldError = field.error;
            const isErrorFalse = !fieldError.isError && fieldError.showError;

            // Return isErrorFalse
            return isErrorFalse;
        });

        if (isValid) {
            setTimeout(() => {
                router.push("/home");
            }, 1000);
        } else {
            setTimeout(() => {
                // Set all error fields to showError
                const newFormState = { ...formState };
                Object.keys(formState).forEach((key) => {
                    const field = formState[key];
                    if (field.error) {
                        if (field.value === "") {
                            field.error.isError = true;
                        }
                        field.error.showError = true;
                    }
                    newFormState[key] = field;
                });
                setFormState(newFormState);
                setIsLoginLoading(false);

                setTimeout(() => {
                    alert("Please fill in all required fields");
                }, 100);
            }, 1000);
        }
    };

    return (
        <div
            className="px-5 py-8 
                max-w-xl m-auto
                flex flex-col gap-4"
        >
            {Object.keys(formState).map((key) => {
                const field = formState[key];
                return (
                    <TextField
                        key={key}
                        id="outlined-required"
                        label={field.label}
                        name={key}
                        required={field.required}
                        fullWidth
                        value={field.value}
                        onChange={handleFormChange}
                        error={
                            field.error &&
                            field.error.isError &&
                            field.error.showError
                        }
                        disabled={field.disabled}
                        sx={{
                            "& .MuiInputBase-input.Mui-disabled": {
                                WebkitTextFillColor: "#ffffff",
                                cursor: "not-allowed",
                            },
                        }}
                    />
                );
            })}

            <ConnectWalletButton></ConnectWalletButton>

            <LoadingButton
                size="large"
                onClick={handleLogin}
                loading={isLoginLoading}
                variant="outlined"
            >
                Login
            </LoadingButton>
        </div>
    );
}
