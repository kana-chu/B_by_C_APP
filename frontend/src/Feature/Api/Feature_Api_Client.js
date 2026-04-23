import { isDev } from "@/env/runtime";

export async function apiPost(url, body, options = {}) {
    const isFormData = body instanceof FormData;

    if (isDev) {
        console.groupCollapsed("[apiPost] REQUEST");
        console.log("URL:", url);
        console.log("Body:", body);
        console.groupEnd();
    }

    const response = await fetch(url, {
        method: "POST",
        headers: isFormData
            ? undefined
            : { "Content-Type": "application/json" },
        body: isFormData ? body : JSON.stringify(body),
        ...options,
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(errorBody);
    }

    return await response.json();
}