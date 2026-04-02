import sys
from pathlib import Path
import uvicorn

if __name__ == "__main__":
    # exe 実行位置（onedir 対応）
    base_dir = Path(sys.executable).parent
    sys.path.insert(0, str(base_dir))

    # main.py を確実に import
    import main

    uvicorn.run(
        main.app,
        host="127.0.0.1",
        port=8000,
        log_level="info",
    )