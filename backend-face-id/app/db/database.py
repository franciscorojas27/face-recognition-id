import os
from sqlmodel import SQLModel, create_engine, Session

sqlite_file_name = os.environ.get("DATABASE_URL", "sqlite:///./faceid.db")
engine = create_engine(sqlite_file_name, echo=False)

def init_db():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session
