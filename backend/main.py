# uvicorn main:app
# uvicorn main:app --reload

# Main Imports
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from decouple import config
import openai


# Custom Function Imports
# ...


# Initiate App
app = FastAPI()


# CORS - Origins
origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:4713",
    "http://localhost:4714",
    "http://localhost:3000",
]


# CORS - Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
 

# Check health
@app.get("/health")
async def check_health():
    return {"message": "healthy"}

# # Post bot response
# # Note: Not playing in browswer when using post request
# @app.post("/post-audio/")
# async def post_audio(file: UploadFile = File(...)):

#     print("hello")