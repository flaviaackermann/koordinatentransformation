import uvicorn
from fastapi import FastAPI, Request
from pyproj import Transformer

app = FastAPI()

@app.middleware("http")
async def addcors(request: Request, call_next):
    response = await call_next(request)
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Allow-Methods"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "*"
    return response

@app.get("/api/python")
def hello_world():
    return {"message": "Hello World",
            "version": "1.0"}

@app.get("/api/list")
def liste():
    return {"liste": ["Apfel", "Banane", "Birne", "Ananas", "Mango", "Orange"]}

@app.get("/api/add")
def addiere(a: int, b: int):
    return {"sum": a+b}

@app.get("/api/transformation")
def transformiere(E: float, N: float):
    transformer = Transformer.from_crs("epsg:2056", "epsg:4326")
    resultat = transformer.transform(E,N)
    return {"koordinaten": f"{resultat[0]}, {resultat[1]}"}