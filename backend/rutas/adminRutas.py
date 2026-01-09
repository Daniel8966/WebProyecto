from fastapi import Depends, HTTPException
from fastapi import APIRouter
from sqlmodel import Session, select, delete
from models.models import Usuario 
from schemas.usuarioSchema import usuarioAdmin, UsuarioCreate, UsuarioPublico, UsuarioLogin
from database.SessionDep import SessionDep  # tu dependencia para obtener la sesión



router = APIRouter(
    prefix="/admin",
    tags=["admin"]
)

@router.post("/", )
def obtenerAcceso(session: SessionDep):
    autores = session.exec(select(Usuario)).all()
    if not autores:
        raise HTTPException(status_code=404, detail="usuarios  no encontrado o eliminados previamente")
    return autores
