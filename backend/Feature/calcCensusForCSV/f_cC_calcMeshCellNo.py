import unicodedata
import numpy as np

def f_cC_calcMeshCellNo(
    code_1per2: int,
    code_1per4: int,
    census_meshSize: str,
    EX_meshSize: str,
):
    # 正規化
    census_meshSize = int(''.join(filter(str.isdigit,
        unicodedata.normalize('NFKC', census_meshSize))))
    EX_meshSize = int(''.join(filter(str.isdigit,
        unicodedata.normalize('NFKC', EX_meshSize))))

    count_cell = int(1000 / EX_meshSize / 2)

    if census_meshSize == 500:
        block = count_cell
        subblock = count_cell
        C = D = 0
    else:  # 250
        block = count_cell
        subblock = count_cell // 2
        C = (code_1per4 - 1) % 2
        D = (code_1per4 - 1) // 2

    A = (code_1per2 - 1) % 2
    B = (code_1per2 - 1) // 2

    x_min = block * A + subblock * C
    y_min = block * B + subblock * D

    x = np.arange(x_min, x_min + subblock)
    y = np.arange(y_min + subblock - 1, y_min - 1, -1)

    return x, y