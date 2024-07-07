"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Home from "./page";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { NEXT_API_BASE_URL } from "../constants";

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
    const [isResetClicked, setIsResetClicked] = useState(false);
    const [shownError, setShownError] = useState(false);

    const [videoURLs, setVideoURLs] = useState<string[]>([]);

    // Check if user is logged in
    if (typeof localStorage !== "undefined") {
        // If not logged in, redirect to login page
        if (!localStorage.getItem("accountId") && !isResetClicked) {
            if (!shownError) {
                setShownError(true);
                alert("Please login first");
                router.push("/");
            }
        }
        // Else if logged in, fetch recommendations
        else if (localStorage.getItem("accountId") && videoURLs.length === 0) {
            const accountId = localStorage.getItem("accountId")!;
            const URL = `${NEXT_API_BASE_URL}/demo/api/recommendations/${accountId}`;

            const fetchData = async () => {
                const response = await fetch(URL);
                const data = await response.json();
                setVideoURLs(data.recommendations);
            };

            fetchData();
        }
    }

    // For the fade effect
    const timeoutDuration = 700;

    if (isHidden && !isResetClicked) {
        setTimeout(() => {
            setIsHidden(false);
        }, timeoutDuration);
    }

    const handleClickReset = () => {
        setIsHidden(true);
        setIsResetClicked(true);

        // Reset
        localStorage.removeItem("accountId");

        setTimeout(() => {
            router.push("/");
        }, timeoutDuration);
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
                        onClick={handleClickReset}
                        disabled={isResetClicked}
                    >
                        Reset
                    </button>
                </header>

                <hr />

                <main>
                    {videoURLs.length > 0 && <Home videoURLs={videoURLs} />}
                </main>
            </section>
        </ThemeProvider>
    );
}
