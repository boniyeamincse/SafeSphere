from fastapi import FastAPI
from app.config import settings
from app.database import engine, Base
from app.models import users, campaigns, training
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(title="SafeSphere API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174", "http://127.0.0.1:5174"],
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


