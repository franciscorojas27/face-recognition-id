import face_recognition
import numpy as np
from typing import Optional
import json
from io import BytesIO

def get_face_embedding(image_bytes: bytes) -> Optional[np.ndarray]:
    try:
        image = face_recognition.load_image_file(BytesIO(image_bytes))
        encodings = face_recognition.face_encodings(image)
        return encodings[0] if encodings else None
    except Exception:
        return None

def compare_embeddings(embedding1: np.ndarray, embedding2: np.ndarray, threshold=0.45) -> bool:
    distance = np.linalg.norm(embedding1 - embedding2)
    return distance < threshold

def encode_embedding(embedding: np.ndarray) -> str:
    return json.dumps(embedding.tolist())

def decode_embedding(encoded: str) -> np.ndarray:
    return np.array(json.loads(encoded))
