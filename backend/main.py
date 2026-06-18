from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from models import CodeRequest
from analyzer import analyze_code

app = FastAPI(
    title="Smart Code Complexity Analyzer"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Smart Code Complexity Analyzer API Running"
    }


@app.post("/analyze")
def analyze(request: CodeRequest):

    if request.language.lower() != "python":
        return {
            "error": "Currently only Python is supported."
        }

    result = analyze_code(request.code)

    return result