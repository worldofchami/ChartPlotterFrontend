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
    
    if(!name) {
        return {
            ok: false,
            message: "Enter a name!"
        }
    }

    const res = await fetch(`${SERVER_URL}/chart/${encodeURIComponent((name as string).toLowerCase())}`);

    try {
        const data = await res.json();
        return data;
    }

    catch(e) {
        console.error(e);

        return {
            ok: false,
            message: "No chart found for this player. Please try again!"
        }
    }
}