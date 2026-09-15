from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .models import Complaint

from .api.complaints import router


app = FastAPI(
    title="PharmaComplaint AI",
    description="AI-powered pharmaceutical customer complaint management system",
    version="1.0.0"
)


# Allow requests from the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(
    router,
    prefix="/api/complaints",
    tags=["Complaints"]
)


@app.get("/")
def root():
    return {
        "message": "PharmaComplaint AI API is running"
    }