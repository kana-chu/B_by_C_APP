import { apiPost } from "../Mod_Api_Client";

export async function Mod_Api_Dat_Inspect({ file_path, start_date }) {
    const fd = new FormData();
    fd.append("file_path", file_path);
    fd.append("start_date", start_date);
    return await apiPost("http://localhost:8000/dat/inspect", fd);
}