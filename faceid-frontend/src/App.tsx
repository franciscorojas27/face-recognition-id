import { useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import './index.css'
import { Header } from "./components/Header";
import { ModeSwitch } from "./components/ModeSwitch";
import { CameraBox } from "./components/CameraBox";
import { StatusMessage } from "./components/StatusMessage";
import { RegisterForm } from "./components/RegisterForm";
import { useCamera } from "./hooks/useCamera";
import { useFaceVerification } from "./hooks/useFaceVerification";
import { useFaceRegistration } from "./hooks/useFaceRegistration";

export default function App() {
  const { videoRef, canvasRef, captureImage } = useCamera();
  const [status, setStatus] = useState("Cargando modelos...");
  const [name, setName] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registerMode, setRegisterMode] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      ]);
      setStatus("Modelos cargados");
    };
    loadModels();
  }, []);

  const { handleVerify } = useFaceVerification({ captureImage, setStatus, setVerifying, setLoading });
  const { handleRegister } = useFaceRegistration({ captureImage, setStatus, setLoading, setName });

  useEffect(() => {
    if (registerMode) return;
    const interval = setInterval(async () => {
      if (!videoRef.current || !faceapi.nets.tinyFaceDetector.params) return;
      const detections = await faceapi.detectAllFaces(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions()
      );
      if (detections.length > 0 && !verifying) {
        clearInterval(interval);
        handleVerify(loading, verifying);
      }
    }, 1500);
    return () => clearInterval(interval);
  }, [verifying, registerMode, handleVerify, loading, videoRef]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center p-4">
      <Header />
      <main className="bg-gray-900/90 rounded-3xl shadow-2xl p-10 flex flex-col items-center w-full max-w-lg border border-blue-900 backdrop-blur-md">
        <ModeSwitch
          registerMode={registerMode}
          loading={loading}
          verifying={verifying}
          onToggle={() => setRegisterMode(m => !m)}
        />
        <div className="flex flex-col items-center w-full space-y-6">
          <CameraBox videoRef={videoRef} canvasRef={canvasRef} loading={loading} />
          <StatusMessage status={status ?? ""} />
        </div>
        {registerMode && (
          <RegisterForm
            name={name}
            loading={loading}
            verifying={verifying}
            onNameChange={e => setName(e.target.value)}
            onSubmit={e => { e.preventDefault(); handleRegister(loading, verifying, name); }}
          />
        )}
      </main>
    </div>
  );
}
