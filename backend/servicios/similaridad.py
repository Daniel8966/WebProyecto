from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def calcular_similitud_tema_documentos(tema, documentos):
    """
    tema: str
    documentos: lista de dicts con 'titulo' y 'abstract'
    """

    corpus = [tema]

    for doc in documentos:
        texto = f"{doc['titulo']} {doc['abstract']}"
        corpus.append(texto)

    vectorizer = TfidfVectorizer(
        stop_words="english",
        max_features=5000
    )

    tfidf = vectorizer.fit_transform(corpus)

    similitudes = cosine_similarity(tfidf[0:1], tfidf[1:])[0]

    # Agregar score a cada documento
    for i, doc in enumerate(documentos):
        doc["similitud"] = float(similitudes[i])

    return documentos