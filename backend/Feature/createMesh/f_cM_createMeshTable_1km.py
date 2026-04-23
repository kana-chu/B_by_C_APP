import numpy as np

def f_cM_createMeshTable_1km(lup_mcode, rdown_mcode):
    s = str(lup_mcode)
    e = str(rdown_mcode)

    lup_34, lup_6, lup_8 = int(s[2:4]), int(s[5]), int(s[7])
    rdn_34, rdn_6, rdn_8 = int(e[2:4]), int(e[5]), int(e[7])

    arr34 = np.arange(lup_34, rdn_34 + 1)
    arr6  = np.arange(0, 8)
    arr8  = np.arange(0, 10)

    m34, m6, m8 = np.meshgrid(arr34, arr6, arr8, indexing="ij")

    mask = np.ones_like(m34, dtype=bool)

    # 左上境界
    mask &= ~(
        (m34 == lup_34) &
        ((m6 < lup_6) | ((m6 == lup_6) & (m8 < lup_8)))
    )

    # 右下境界
    mask &= ~(
        (m34 == rdn_34) &
        ((m6 > rdn_6) | ((m6 == rdn_6) & (m8 > rdn_8)))
    )

    return (m34[mask] * 100 + m6[mask] * 10 + m8[mask]).astype(int)