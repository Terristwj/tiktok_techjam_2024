import { NextResponse } from "next/server";
import { FLASK_API_BASE_URL, allowedAccountIds } from "@/app/demo/constants";

const DATA_SOURCE_URL = `${FLASK_API_BASE_URL}/api/recommendation/`;

export async function GET(request: Request) {
    const personId = request.url.slice(request.url.lastIndexOf("/") + 1);
    if (!allowedAccountIds.includes(personId)) {
        return NextResponse.json(
            {
                message: "personId not found",
            },
            {
                status: 404,
            }
        );
    }

    const response = await fetch(DATA_SOURCE_URL + personId);
    const data = await response.json();
    return NextResponse.json(data);
}
