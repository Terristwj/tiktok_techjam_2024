"use client";
import { useRouter } from "next/navigation";
import { useState, Dispatch, SetStateAction } from "react";

import { TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { NEXT_API_BASE_URL } from "../constants";
import ConnectWalletButton from "../../components/ConnectWalletButton";

import { allowedAccountIds } from "../constants";

export default function Login({
    formState,
    setFormState,
    handleFormChange,
    setIsHidden,
    setIsNavigatingOut,
    timeoutDuration,
}: {
    formState: any;
    setFormState: Dispatch<any>;
    handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setIsHidden: Dispatch<SetStateAction<boolean>>;
    setIsNavigatingOut: Dispatch<SetStateAction<boolean>>;
    timeoutDuration: number;
}) {
    const router = useRouter();
    const [isLoginLoading, setIsLoginLoading] = useState(false);

    const handleLogin = async () => {
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

        // Default error message
        let errorMessage = "Please fill in all required fields";

        // Call API
        if (isValid) {
            // const URL = `${NEXT_API_BASE_URL}/demo/api/recommendations/${formState.accountId.value}`;
            // const response = await fetch(URL);
            // const data = await response.json();

            const URL = `${NEXT_API_BASE_URL}/demo/api/health`;
            const response = await fetch(URL);

            // API Success
            if (response.status === 200) {
                const accountId = formState.accountId.value;
                // Success
                if (allowedAccountIds.includes(accountId)) {
                    localStorage.setItem("accountId", accountId);
                    setTimeout(() => {
                        setIsHidden(true);
                        setIsNavigatingOut(true);
                        setTimeout(() => {
                            router.push(`/demo/home`);
                        }, timeoutDuration);
                    }, timeoutDuration);

                    // Stops
                    return;
                }

                // No Account Id found
                else {
                    errorMessage = `Error 404: Account Id not found`;
                }
            }
            // API Error
            else {
                errorMessage = `Error ${response.status}: Please check API is running`;
            }
        }

        // Error Handler
        setTimeout(() => {
            // Set all error fields to showError
            const newFormState = { ...formState };
            Object.keys(formState).forEach((key) => {
                const field = formState[key];
                if (field.error) {
                    if (
                        field.value === "" ||
                        (field.label === "Account Id" &&
                            !allowedAccountIds.includes(field.value))
                    ) {
                        field.error.isError = true;
                    }
                    field.error.showError = true;
                }
                newFormState[key] = field;
            });
            setFormState(newFormState);

            setIsLoginLoading(false);

            setTimeout(() => {
                alert(errorMessage);
            }, 100);
        }, 1000);
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
