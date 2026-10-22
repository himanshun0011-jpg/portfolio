from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import logging
from pathlib import Path
from pydantic import BaseModel
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


class SubscriberCreate(BaseModel):
    email: str


@api_router.get("/")
async def root():
    return {"message": "DUARTE API"}


@api_router.get("/health")
async def health():
    return {"status": "ok"}


@api_router.post("/newsletter")
async def subscribe(input: SubscriberCreate):
    email = input.email.strip().lower()
    if not EMAIL_RE.match(email):
        raise HTTPException(status_code=422, detail="Please enter a valid email address.")
    existing = await db.subscribers.find_one({"email": email})
    if existing:
        return {"status": "exists", "message": "You're already in the loop."}
    await db.subscribers.insert_one({
        "email": email,
        "subscribed_at": datetime.now(timezone.utc).isoformat(),
    })
    return {"status": "ok", "message": "Welcome to the loop. See you weekly."}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
