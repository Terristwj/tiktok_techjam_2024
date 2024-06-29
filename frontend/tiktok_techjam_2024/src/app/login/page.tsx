"use client";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();

    return (
        <>
            <button className="border" onClick={() => router.push("/")}>
                Back
            </button>
            <br />
            <h1>Hello world</h1>
        </>
    );
}
