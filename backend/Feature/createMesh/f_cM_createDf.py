import pandas as pd
import numpy as np

from Feature.createMesh.f_cM_createMeshTable_1km import f_cM_createMeshTable_1km

def f_cM_createDf(lup_mcode, rdown_mcode, ex_mesh_size, lonlat):
    # 1km メッシュ（NumPy）
    mesh_1k = f_cM_createMeshTable_1km(lup_mcode, rdown_mcode)

    # exsize cell 数
    match ex_mesh_size:
        case "5":
            cells = 199
        case "25":
            cells = 39
        case "50":
            cells = 19
        case _:
            raise ValueError("ex_mesh_size 不正")

    # 向き判定
    if lonlat == "lon":
        ex_vals = np.arange(cells, -1, -1)
        count = np.arange(len(mesh_1k) * (cells + 1), 0, -1)
    elif lonlat == "lat":
        ex_vals = np.arange(0, cells + 1)
        count = np.arange(1, len(mesh_1k) * (cells + 1) + 1)
    else:
        raise ValueError("lonlat は 'lon' or 'lat'")

    base_len = len(ex_vals)

    df = pd.DataFrame({
        "メッシュコード00000070_1km": np.repeat(mesh_1k, base_len),
        f"出力メッシュサイズ{ex_mesh_size}": np.tile(ex_vals, len(mesh_1k)),
    })

    m = df["メッシュコード00000070_1km"].values

    df["1次地域メッシュコード"] = m // 100
    df["2次地域メッシュコード8km"] = (m // 10) % 10
    df["2次地域メッシュコード1km"] = m % 10
    df["カウント"] = count

    # 必要列だけ
    df = df[[
        "2次地域メッシュコード8km",
        "2次地域メッシュコード1km",
        f"出力メッシュサイズ{ex_mesh_size}",
        "カウント",
    ]]

    # 緯度は転置
    if lonlat == "lat":
        df = df.T

    return df
