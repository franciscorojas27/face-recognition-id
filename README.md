# Face Recognition ID

Face Recognition ID es una aplicación fullstack que permite el registro y la verificación de identidad de usuarios mediante reconocimiento facial. Utiliza un backend en FastAPI con la librería `face_recognition` y un frontend moderno en React (Bun + Vite), permitiendo una experiencia fluida y segura.

## ¿Qué hace este proyecto?

- Permite registrar usuarios capturando su rostro desde la cámara web.
- Verifica la identidad de una persona comparando su rostro en tiempo real con los registrados.
- Impide el registro duplicado del mismo rostro.
- Proporciona una interfaz moderna, responsiva y fácil de usar.
- Backend robusto con FastAPI y almacenamiento de embeddings faciales.
- Scripts globales para instalar y levantar todo el entorno fácilmente.

## Tecnologías principales

- **Frontend:** React, Bun, Vite, TailwindCSS, face-api.js
- **Backend:** FastAPI, face_recognition, SQLModel, SQLite
- **Reconocimiento facial:** [face_recognition](https://github.com/ageitgey/face_recognition) (Python) y [face-api.js](https://github.com/justadudewhohacks/face-api.js) (JS)
- **Otros:** TypeScript, concurrently, pip

## Requisitos

- Node.js y Bun instalados para el frontend
- Python 3.8+ para el backend
- [face_recognition](https://github.com/ageitgey/face_recognition) (y sus dependencias)
- Compilador de C++ y herramientas de desarrollo para instalar dlib/face_recognition (en Windows: Build Tools de Visual Studio)

## Instalación

### 1. Clona el repositorio

```sh
git clone <repo-url>
cd face-recognition-id
```

### 2. Instala dependencias del frontend

```sh
bun run install:frontend
```

### 3. Instala dependencias del backend

```sh
# Asegúrate de tener pip actualizado
cd backend-face-id
pip install --upgrade pip
pip install -r requirements.txt
```

> **Nota:** Si tienes problemas instalando `face_recognition` o `dlib`, asegúrate de tener un compilador de C++ instalado:
>
> - **Windows:** Instala [Build Tools for Visual Studio](https://visualstudio.microsoft.com/visual-cpp-build-tools/)
> - **Linux:** `sudo apt install build-essential`
> - **Mac:** `xcode-select --install`

### 4. Instala todo automáticamente (opcional)

Desde la raíz del proyecto:

```sh
bun run install:all
```

## Uso en desarrollo

Para levantar backend y frontend juntos:

```sh
bun run dev
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:8000](http://localhost:8000)

## Estructura del proyecto

```text
face-recognition-id/
├── backend-face-id/         # Backend FastAPI + face_recognition
├── faceid-frontend/         # Frontend React + Bun
├── package.json             # Scripts globales
└── README.md
```

## Características destacadas

- Registro facial seguro y único por usuario.
- Verificación automática y manual desde el frontend.
- UI moderna, responsiva y accesible.
- Manejo de errores y mensajes claros para el usuario.
- Scripts para desarrollo rápido y despliegue local.
- Código organizado en componentes y hooks reutilizables.

## Notas

- El backend requiere acceso a la cámara y modelos cargados en el frontend.
- No se puede registrar dos veces el mismo rostro.
- Si tienes problemas con dependencias de Python, revisa la documentación de [face_recognition](https://github.com/ageitgey/face_recognition).
- Puedes personalizar los scripts y la UI según tus necesidades.

---

**Desarrollado por [Francisco Rojas]**
