"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    return (
        <>
            <main className="w-screen h-screen flex items-center justify-center">
                {/* Demo Button - START */}
                <button
                    className="border relative group ease-in-out"
                    onClick={() => router.push("/login")}
                >
                    {/* Demo Button Background - START */}
                    <div className="border absolute w-full h-full left-0 top-0 -z-10 flex">
                        <div className="group-hover:bg-[#ff0050] opacity-75 w-1/5 h-full transition duration-300"></div>
                        <div className="group-hover:bg-[#000000] opacity-75 w-3/5 h-full transition duration-300"></div>
                        <div className="group-hover:bg-[#00f2ea] opacity-75 w-1/5 h-full transition duration-300"></div>
                    </div>
                    {/* Demo Button Background - END */}

                    {/* Demo Button Text - START */}
                    <div className="py-4 px-8 z-10">Start Demo</div>
                    {/* Demo Button Text - END */}
                </button>

                {/* Demo Button - END */}
            </main>
        </>
    );
}
