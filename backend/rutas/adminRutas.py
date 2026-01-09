from fastapi import Depends, HTTPException
from fastapi import APIRouter
from sqlmodel import Session, select, delete
from models.models import Usuario, Admin 
from schemas.usuarioSchema import usuarioAdmin, UsuarioCreate, UsuarioPublico, UsuarioLogin
from database.SessionDep import SessionDep  # tu dependencia para obtener la sesión



router = APIRouter(
    prefix="/admin",
    tags=["admin"]
)

@router.post("/", )
def registrar_admin(admin: usuarioAdmin, session: SessionDep):
    nuevo_usuario = Admin(**admin.model_dump())

    session.add(nuevo_usuario)
    session.commit()
    session.refresh(nuevo_usuario)

    return {
        "mensaje": "Usuario administrador registrado exitosamente",
        "usuario": nuevo_usuario
    }

@router.delete("/usuarios/eliminar-todos")
def eliminar_todos_los_admins(session: SessionDep):

    session.exec(delete(Admin))   # ← Borra todos los registros de la tabla
    session.commit()

    return {"mensaje": "Todos los usuarios fueron eliminados"}

@router.post("/login")
def iniciar_sesion_admin(session: SessionDep, admin: UsuarioLogin):
    comprobar_admin = session.exec(
        select(Admin).where(
            Admin.nombre == admin.nombre,
            Admin.password == admin.password
        )
    ).first()

    if not comprobar_admin:
        raise HTTPException(
            status_code=404,
            detail="Administrador no encontrado o credenciales incorrectas"
        )

    return {
        "resultado": "positivo",
        "mensaje": "Login de administrador exitoso",
        "admin": comprobar_admin
    }