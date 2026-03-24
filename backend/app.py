# backend/app.py
from fastapi import FastAPI
from Router.route_dat import router as dat_router

app = FastAPI()

# dat 関連API をまとめて登録
app.include_router(dat_router)