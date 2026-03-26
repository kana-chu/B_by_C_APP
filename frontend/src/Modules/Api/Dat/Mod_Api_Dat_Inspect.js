import { apiPost } from "../Mod_Api_Client";

export async function Mod_Api_Dat_Inspect({ file_path }) {
    const fd = new FormData();
    fd.append("file_path", file_path);
    return await apiPost("http://localhost:8000/dat/inspect", fd);
}