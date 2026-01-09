import requests

BASE_URL = "https://api.openalex.org/works"


def buscar_documentos_openalex(tema, max_resultados=10):
    params = {
        "search": tema,
        "per-page": max_resultados
    }

    response = requests.get(BASE_URL, params=params)

    if response.status_code != 200:
        raise Exception("Error al consultar OpenAlex")

    data = response.json()
    documentos = []

    for item in data.get("results", []):
        # Obtener link principal
        link = None

        primary_location = item.get("primary_location")
        if primary_location and primary_location.get("landing_page_url"):
            link = primary_location["landing_page_url"]
        elif item.get("doi"):
            link = f"https://doi.org/{item['doi']}"

        documento = {
            "titulo": item.get("title"),
            "año": item.get("publication_year"),
            "autores": [
                autor["author"]["display_name"]
                for autor in item.get("authorships", [])
            ],
            "abstract": reconstruir_abstract(
                item.get("abstract_inverted_index")
            ),
            "link": link
        }

        documentos.append(documento)

    return documentos


def reconstruir_abstract(abstract_inverted_index):
    if not abstract_inverted_index:
        return ""

    palabras = {}
    for palabra, posiciones in abstract_inverted_index.items():
        for pos in posiciones:
            palabras[pos] = palabra

    return " ".join(
        palabra for _, palabra in sorted(palabras.items())
    )
