from fastapi import APIRouter
from pydantic import BaseModel
import requests
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

router = APIRouter(prefix="/analisis", tags=["Análisis"])

# -------- MODELO --------
class TextoUsuario(BaseModel):
    texto: str

# -------- SIMILITUD --------
def similitud_texto(texto_usuario, texto_doc):
    vectorizer = TfidfVectorizer(stop_words="english")
    tfidf = vectorizer.fit_transform([texto_usuario, texto_doc])
    return cosine_similarity(tfidf[0:1], tfidf[1:2])[0][0]

# -------- ENDPOINT --------
@router.post("/documento")
def analizar_documento(data: TextoUsuario):
    url = "https://api.openalex.org/works"
    params = {
        "search": data.texto,
        "per-page": 8
    }

    response = requests.get(url, params=params)
    works = response.json().get("results", [])

    resultados = []

    for work in works:
        titulo = work.get("display_name", "")
        abstract_inv = work.get("abstract_inverted_index")

        #  reconstruir abstract SOLO si existe
        if abstract_inv:
            abstract_text = " ".join(
                word for word, positions in abstract_inv.items()
                for _ in positions
            )
        else:
            abstract_text = titulo  # fallback REALISTA

        texto_base = f"{titulo} {abstract_text}"

        score = similitud_texto(data.texto, texto_base)

        #  umbral más realista
        if score < 0.15:
            continue

        autores = [
            a["author"]["display_name"]
            for a in work.get("authorships", [])
            if a.get("author")
        ]

        link = None
        if work.get("primary_location"):
            link = work["primary_location"].get("landing_page_url")

        resultados.append({
            "titulo": titulo,
            "año": work.get("publication_year"),
            "autores": autores,
            "resumen": abstract_text[:400] if abstract_inv else "Resumen no disponible",
            "link": link,
            "similitud": round(score, 2),
            "cita_apa": f"{', '.join(autores)} ({work.get('publication_year')}). {titulo}."
        })

    return resultados