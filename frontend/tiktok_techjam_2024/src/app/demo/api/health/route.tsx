import { NextResponse } from "next/server";
import { FLASK_API_BASE_URL } from "@/app/demo/constants";

const DATA_SOURCE_URL = `${FLASK_API_BASE_URL}/api/health`;

export async function GET() {
    const response = await fetch(DATA_SOURCE_URL);
    const data = await response.json();
    return NextResponse.json(data);
}
