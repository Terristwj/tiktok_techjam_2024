"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
    const router = useRouter();
    const [isHidden, setIsHidden] = useState(true);
    const [isDemoClicked, setIsDemoClicked] = useState(false);

    // For the fade effect
    const timeoutDuration = 1000;

    if (isHidden && !isDemoClicked) {
        setTimeout(() => {
            setIsHidden(false);
        }, timeoutDuration);
    }

    const handleDemoClick = () => {
        setIsHidden(true);
        setIsDemoClicked(true);

        setTimeout(() => {
            router.push("/demo/login");
        }, timeoutDuration);
    };

    return (
        <>
            <main
                className="w-screen h-screen 
                    flex flex-col items-center justify-center"
            >
                {/* Fade Effect - START */}
                <div
                    className={`transition duration-700
                        flex flex-col items-center justify-center 
                        ${isHidden ? "opacity-0" : "opacity-100"}
                    `}
                >
                    <>
                        {/* Logo */}
                        <div className="text-4xl font-bold text-center mb-2">
                            Welcome to TikTok TechJam 2024
                        </div>

                        {/* Subtitle */}
                        <div className="text-2xl text-center mb-8">
                            Problem Statement On: Innovating Privacy
                        </div>

                        {/* Description */}
                        <div className="text-lg text-center mb-8">
                            Click the button below to start the demo.
                        </div>
                    </>

                    {/* Demo Button - START */}
                    <button
                        className="border relative group ease-in-out"
                        onClick={handleDemoClick}
                        disabled={isHidden}
                    >
                        {/* Demo Button Background - START */}
                        <div
                            className="border absolute flex
                                w-full h-full 
                                left-0 top-0 -z-10"
                        >
                            <div
                                className={`group-hover:bg-[#ff0050] w-1/6 h-full transition duration-700`}
                            />
                            <div
                                className={`group-hover:bg-[#000000] w-4/6 h-full transition duration-700`}
                            >
                                <div
                                    className={`group-hover:bg-[#ff0050] w-full h-1/6 transition duration-700`}
                                />
                                <div
                                    className={`group-hover:bg-[#000000] w-full h-4/6 transition duration-700`}
                                />
                                <div
                                    className={`group-hover:bg-[#00f2ea] w-full h-1/6 transition duration-700`}
                                />
                            </div>
                            <div
                                className={`group-hover:bg-[#00f2ea] w-1/6 h-full transition duration-700`}
                            ></div>
                        </div>
                        {/* Demo Button Background - END */}

                        {/* Demo Button Text - START */}
                        <div className="py-6 px-7 z-10">Start Demo</div>
                        {/* Demo Button Text - END */}
                    </button>

                    {/* Demo Button - END */}
                </div>
                {/* Fade Effect - END */}
            </main>
        </>
    );
}
