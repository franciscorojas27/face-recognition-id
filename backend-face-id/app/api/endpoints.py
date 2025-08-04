from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException
from app.db.database import get_session
from app.models.user import User
from app.services.face import get_face_embedding, compare_embeddings, encode_embedding, decode_embedding
from sqlmodel import Session, select

router = APIRouter()


@router.post("/register")
async def register(name: str = Form(...), file: UploadFile = File(...), session: Session = Depends(get_session)):
    img_bytes = await file.read()
    embedding = get_face_embedding(img_bytes)

    if embedding is None:
        raise HTTPException(status_code=400, detail="No face detected")

    # Verificar si ya existe un usuario con un embedding similar
    users = session.exec(select(User)).all()
    for user in users:
        stored_embedding = decode_embedding(user.embedding)
        if compare_embeddings(embedding, stored_embedding):
            raise HTTPException(status_code=409, detail="El rostro ya está registrado")

    user = User(name=name, embedding=encode_embedding(embedding))
    session.add(user)
    session.commit()
    session.refresh(user)

    return {"message": "User registered", "user_id": user.id}


@router.post("/verify")
async def verify(file: UploadFile = File(...), session: Session = Depends(get_session)):
    img_bytes = await file.read()
    embedding = get_face_embedding(img_bytes)

    if embedding is None:
        raise HTTPException(status_code=400, detail="No face detected")

    users = session.exec(select(User)).all()

    for user in users:
        stored_embedding = decode_embedding(user.embedding)
        if compare_embeddings(embedding, stored_embedding):
            return {"match": True, "user": user.name}

    return {"match": False}
