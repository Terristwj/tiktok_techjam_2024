"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
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

    // For the fade effect
    const timeoutDuration = 700;

    // For the demo button background
    const transitionDuration = 500;

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
    return (
        <section
            className={`transition duration-${transitionDuration}
                ${isHidden ? "opacity-0" : "opacity-100"}
            `}
        >
            <header className="px-5 py-5">
                <button
                    className="border px-2 py-1 
                            transition duration-50
                            hover:bg-gray-200 hover:text-black"
                    onClick={handleBackClick}
                    disabled={isBackClicked}
                >
                    Back
                </button>
            </header>

            <hr />

            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <main>{children}</main>
            </ThemeProvider>
        </section>
    );
}
