"use client";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function Login() {
    return (
        <div
            className="px-5 py-8 
                max-w-4xl m-auto
                flex flex-col gap-4"
        >
            <TextField
                id="outlined-required"
                label="Account Id"
                required
                fullWidth
            />
            <TextField
                id="outlined-required"
                label="Nickname"
                required
                fullWidth
            />
            <TextField
                id="outlined-required"
                label="Likelihood to Watch"
                fullWidth
            />
            <TextField
                id="outlined-required"
                label="Likelihood to Comment"
                fullWidth
            />
            <TextField
                id="outlined-required"
                label="Likelihood to Like"
                fullWidth
            />

            <h1>Hello world</h1>
        </div>
    );
}
