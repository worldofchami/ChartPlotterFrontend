"use server"
import dotenv from "dotenv";
dotenv.config();

const SERVER_URL = process.env.SERVER_URL;

interface State {
    ok: boolean;
    message: string;
}

export async function submit(_: State | null, formData: FormData): Promise<State> {
    const name = formData.get("name");

    const res = await fetch(`${SERVER_URL}/chart/${encodeURIComponent((name as string).toLowerCase())}`);

    return await res.json();
}