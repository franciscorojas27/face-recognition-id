import { useCallback } from "react";

export function useFaceRegistration({ captureImage, setStatus, setLoading, setName }: {
  captureImage: () => string | null,
  setStatus: (s: string) => void,
  setLoading: (l: boolean) => void,
  setName: (n: string) => void,
}) {
  const handleRegister = useCallback(async (loading: boolean, verifying: boolean, name: string) => {
    if (loading || verifying) return;
    const imageData = captureImage();
    if (!imageData || !name) {
      setStatus("⚠️ Debes ingresar un nombre y capturar rostro");
      return;
    }
    setLoading(true);
    setStatus("Registrando rostro...");
    try {
      const byteString = atob(imageData);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: "image/jpeg" });
      const formData = new FormData();
      formData.append("file", blob, "face.jpg");
      formData.append("name", name);
      const res = await fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setStatus("✅ Registro exitoso");
        setName("");
      } else {
        const data = await res.json();
        if (res.status === 409 && data.detail === "El rostro ya está registrado") {
          setStatus("⚠️ Este rostro ya está registrado");
        } else if (data.detail === "No face detected") {
          setStatus("❌ No se detectó un rostro en la imagen");
        } else {
          setStatus("❌ Error al registrar");
        }
      }
    } catch (err) {
      setStatus("❌ Falló el registro");
      console.error(err);
    }
    setLoading(false);
  }, [captureImage, setStatus, setLoading, setName]);

  return { handleRegister };
}
