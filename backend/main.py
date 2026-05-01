"""
@component main
@folder backend
@category EntryPoint
@description
    FastAPI アプリケーションのエントリポイント。
    Router を集約し、Uvicorn から起動される。
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# 各 Router を import
from Router.route_createMesh import router as create_mesh
from Router.route_calcCensusSeparate import router as calc_census
from Router.route_calcCensusForCSV import router as calc_census_csv

# --------------------------------------------------
# FastAPI アプリ生成
# --------------------------------------------------
app = FastAPI(
    title="AppForRRI Backend API",
    description="Rainfall Rate Change Backend",
    version="1.0.0",
)

# --------------------------------------------------
# CORS 設定（Electron / React からのアクセス許可）
# --------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # 必要に応じてドメイン制限可
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------------------------------
# Router 登録
# --------------------------------------------------
app.include_router(create_mesh)
app.include_router(calc_census)
app.include_router(calc_census_csv)

# --------------------------------------------------
# ヘルスチェック用
# --------------------------------------------------
@app.get("/")
def health_check():
    return {
        "status": "OK",
        "message": "AppForRRI Backend is running"
    }