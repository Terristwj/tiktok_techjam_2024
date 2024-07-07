"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Login from "./page";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { initialFormState, formState_Set1, formState_Set2 } from "./constants";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: "#000000",
        },
    },
});

export default function LoginLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [isHidden, setIsHidden] = useState(true);
    const [isBackClicked, setIsBackClicked] = useState(false);

    const [formState, setFormState] = useState<any>(initialFormState);

    // For the fade effect
    const timeoutDuration = 700;

    if (isHidden && !isBackClicked) {
        setTimeout(() => {
            setIsHidden(false);
        }, timeoutDuration);
    }

    const handleBackClick = () => {
        setIsHidden(true);
        setIsBackClicked(true);

        setTimeout(() => {
            router.push("/");
        }, timeoutDuration);
    };

    const switchDataSet = (e: any) => {
        // setFormState(datasetValue);
        const dataset = e.target.name;
        if (dataset === "reset") {
            setFormState(initialFormState);
        } else if (dataset === "dataset1") {
            setFormState(formState_Set1);
        } else if (dataset === "dataset2") {
            setFormState(formState_Set2);
        }
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Get all formState with error handlers
        const errorFields = Object.keys(formState).filter(
            (key) => formState[key].error
        );

        // Default newValue
        const newValue: any = {
            label: formState[e.target.name].label,
            value: e.target.value,
            required: formState[e.target.name].required,
        };
        // isError newValue
        if (errorFields.includes(e.target.name)) {
            newValue["error"] = {
                isError: e.target.value === "",
                showError: true,
            };
        }

        // Update formState
        setFormState({
            ...formState,
            [e.target.name]: newValue,
        });
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <section
                className={`h-screen w-screen
                transition duration-500
                ${isHidden ? "opacity-0" : "opacity-100"}
            `}
            >
                <header className="px-5 py-5 flex flex-row gap-5">
                    <button
                        className="border border-white
                            px-2 py-1 text-white 
                            hover:bg-gray-200 hover:text-black
                            transition duration-300"
                        onClick={handleBackClick}
                        disabled={isBackClicked}
                    >
                        Back
                    </button>
                    <div className="w-full flex flex-row-reverse gap-5">
                        <button
                            className="border border-[#00f2ea]
                                px-3 py-1 text-[#00f2ea]
                                hover:border-[#ff0050] hover:text-[#ff0050]
                                transition duration-300"
                            name="reset"
                            onClick={switchDataSet}
                            disabled={isBackClicked}
                        >
                            Reset
                        </button>
                        <button
                            className="border border-[#00f2ea]
                                px-3 py-1 text-[#00f2ea]
                                hover:border-[#ff0050] hover:text-[#ff0050]
                                transition duration-300"
                            name="dataset1"
                            onClick={switchDataSet}
                            disabled={isBackClicked}
                        >
                            Dataset 1
                        </button>
                        <button
                            className="border border-[#00f2ea]
                                px-3 py-1 text-[#00f2ea]
                                hover:border-[#ff0050] hover:text-[#ff0050]
                                transition duration-300"
                            name="dataset2"
                            onClick={switchDataSet}
                            disabled={isBackClicked}
                        >
                            Dataset 2
                        </button>
                    </div>
                </header>

                <hr />

                <main>
                    <Login
                        formState={formState}
                        setFormState={setFormState}
                        handleFormChange={handleFormChange}
                    />
                </main>
            </section>
        </ThemeProvider>
    );
}
