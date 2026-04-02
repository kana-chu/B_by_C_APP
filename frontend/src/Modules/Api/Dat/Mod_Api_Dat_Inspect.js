import { apiPost } from "../Mod_Api_Client";

export async function Mod_Api_Dat_Inspect({
    file_path,
    start_date,
    end_date,
}) {
    return await apiPost(
        "http://localhost:8000/dat/inspect",
        {
            file_path,
            start_date,
            end_date,
        }
    );
}