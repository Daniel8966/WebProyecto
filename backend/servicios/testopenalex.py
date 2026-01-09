from openalex_client import buscar_documentos_openalex
from similaridad import calcular_similitud_tema_documentos
tema = "peces en el rio"

resultados = buscar_documentos_openalex(tema, max_resultados=5)

resultados_con_score = calcular_similitud_tema_documentos(
    tema,
    resultados
)

# Ordenar por similitud
resultados_ordenados = sorted(
    resultados_con_score,
    key=lambda x: x["similitud"],
    reverse=True
)

for i, doc in enumerate(resultados_ordenados, 1):
    print(f"\nDocumento {i}")
    print("Título:", doc.get("titulo", "N/A"))
    print("Año:", doc.get("año", "N/A"))
    print("Autores:", ", ".join(doc.get("autores", [])))
    
    resumen = doc.get("abstract", "")
    print("Resumen:", resumen[:300] + "..." if resumen else "No disponible")

    link = doc.get("link")
    print("Link:", link if link else "No disponible")

    print("Similitud:", round(doc.get("similitud", 0), 4))
    print("-" * 60)