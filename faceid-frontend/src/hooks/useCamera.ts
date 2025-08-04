import { useEffect, useCallback, useRef } from "react";

export function useCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const startVideo = () => {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      });
    };
    startVideo();
  }, []);

  const captureImage = useCallback((): string | null => {
    if (!videoRef.current || !canvasRef.current) return null;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return null;
    canvas.width = 320;
    canvas.height = 240;
    context.drawImage(videoRef.current, 0, 0, 320, 240);
    const rawData = canvas.toDataURL("image/jpeg");
    return rawData.replace(/^data:image\/\w+;base64,/, "");
  }, []);

  return { videoRef, canvasRef, captureImage };
}
