from fastapi import APIRouter, Depends
from sqlmodel import Session, select
import requests
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from database.SessionDep import SessionDep 
from models.models import Usuario
router = APIRouter(prefix="/prueba", tags=["Prueba del sistema"])

def calcular_similitud(texto1, texto2):
    vectorizer = TfidfVectorizer(stop_words="english")
    tfidf = vectorizer.fit_transform([texto1, texto2])
    return cosine_similarity(tfidf[0:1], tfidf[1:2])[0][0]

@router.get("/general")
def prueba_general(session: SessionDep):
    resultado = {}

    # 1 Probar conexión a BD
    usuarios = session.exec(select(Usuario)).all()
    resultado["bd_conexion"] = "OK"
    resultado["total_usuarios"] = len(usuarios)

    # 2 Login simulado
    if usuarios:
        resultado["login_prueba"] = "OK"
        resultado["usuario_ejemplo"] = usuarios[0].nombre
    else:
        resultado["login_prueba"] = "SIN USUARIOS"

    # 3 Probar OpenAlex
    texto_prueba = "machine learning in education"

    response = requests.get(
        "https://api.openalex.org/works",
        params={"search": texto_prueba, "per-page": 1}
    )

    if response.status_code != 200:
        resultado["openalex"] = "ERROR"
        return resultado

    work = response.json()["results"][0]

    titulo = work.get("display_name", "")
    abstract_inv = work.get("abstract_inverted_index")

    if abstract_inv:
        abstract = " ".join(
            word for word, positions in abstract_inv.items()
            for _ in positions
        )
    else:
        abstract = titulo

    #  Similitud
    similitud = calcular_similitud(texto_prueba, abstract)

    # 5 Cita APA
    autores = [
        a["author"]["display_name"]
        for a in work.get("authorships", [])
        if a.get("author")
    ]

    cita = f"{', '.join(autores)} ({work.get('publication_year')}). {titulo}."

    # 6 Resultado final
    resultado["openalex"] = "OK"
    resultado["titulo"] = titulo
    resultado["similitud"] = round(similitud, 2)
    resultado["cita_apa"] = cita

    return resultado
