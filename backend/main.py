# backend/app.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# ▼ Router 読み込み
from Router.route_dat import router as dat_router


# ======================================
# ▼ FastAPI アプリ本体
# ======================================
app = FastAPI()


# ======================================
# ▼ CORS 設定（これが無いと React/Electron からアクセス拒否）
# ======================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ← 必要なら ["http://localhost:5173"] に変更してもOK
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ======================================
# ▼ ルーター登録（/dat/xxx が有効になる）
# ======================================
app.include_router(dat_router)