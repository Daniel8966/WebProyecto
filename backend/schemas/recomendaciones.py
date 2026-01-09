from pydantic import BaseModel
from typing import List, Optional


class Documento(BaseModel):
    titulo: str
    año: Optional[int]
    autores: List[str]
    abstract: str
    link: Optional[str]
    similitud: float
