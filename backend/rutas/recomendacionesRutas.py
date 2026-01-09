from fastapi import APIRouter, Query
from typing import List

from servicios.openalex_client import buscar_documentos_openalex
from servicios.similaridad import calcular_similitud_tema_documentos
from schemas.recomendaciones import Documento

router = APIRouter(
    prefix="/recomendaciones",
    tags=["Recomendaciones"]
)


@router.get("/", response_model=List[Documento])
def recomendar_documentos(
    tema: str = Query(..., min_length=5),
    max_resultados: int = 10
):
    documentos = buscar_documentos_openalex(tema, max_resultados)

    if not documentos:
        return []

    documentos_ordenados = calcular_similitud_tema_documentos(
        tema,
        documentos
    )

    return documentos_ordenados
