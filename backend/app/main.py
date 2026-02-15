from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from app.config import settings
from app.database import engine, Base
from app.models import users, campaigns, training
from fastapi.middleware.cors import CORSMiddleware
import os


app = FastAPI(title="SafeSphere API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

@app.get("/")
def read_root():
    return {"message": "Welcome to SafeSphere API"}

from app.routes import auth, users, campaigns, training
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(campaigns.router, prefix="/campaigns", tags=["campaigns"])
app.include_router(training.router, prefix="/training", tags=["training"])

from app.routers import groups
app.include_router(groups.router, prefix="/groups", tags=["groups"])

from app.routers import campaign_assets
app.include_router(campaign_assets.router, prefix="/assets", tags=["campaign-assets"])

# Serve frontend static files
frontend_dist = "/app/frontend/dist"
if os.path.exists(frontend_dist):
    app.mount("/", StaticFiles(directory=frontend_dist, html=True), name="frontend")


