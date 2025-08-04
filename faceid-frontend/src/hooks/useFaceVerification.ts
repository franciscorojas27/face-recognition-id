import { useCallback } from "react";

export function useFaceVerification({ captureImage, setStatus, setVerifying, setLoading }: {
  captureImage: () => string | null,
  setStatus: (s: string) => void,
  setVerifying: (v: boolean) => void,
  setLoading: (l: boolean) => void,
}) {
  const handleVerify = useCallback(async (loading: boolean, verifying: boolean) => {
    if (loading || verifying) return;
    setVerifying(true);
    setLoading(true);
    setStatus("Verificando rostro...");
    const imageData = captureImage();
    if (!imageData) {
      setStatus("Error capturando imagen");
      setVerifying(false);
      setLoading(false);
      return;
    }
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
      const res = await fetch("http://127.0.0.1:8000/verify", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.match === true) {
        setStatus(`✅ Rostro verificado: ${data.user || "Usuario"}`);
      } else {
        setStatus("❌ No se encontró coincidencia");
      }
    } catch (err) {
      setStatus("Error en la verificación");
      console.error(err);
    }
    setVerifying(false);
    setLoading(false);
  }, [captureImage, setStatus, setVerifying, setLoading]);

  return { handleVerify };
}
