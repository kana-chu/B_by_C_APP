export async function apiPost(url, body, options = {}) {
    const isFormData = body instanceof FormData;

    const response = await fetch(url, {
        method: "POST",
        headers: isFormData
            ? undefined
            : {
                "Content-Type": "application/json",
                ...(options.headers || {}),
            },
        body: isFormData ? body : JSON.stringify(body),
        ...options,
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(
            `API Error: ${response.status} - ${response.statusText}\n${errorBody}`
        );
    }

    return await response.json();
}