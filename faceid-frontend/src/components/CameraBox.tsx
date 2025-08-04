export interface CameraBoxProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  loading: boolean;
}

export function CameraBox({ videoRef, canvasRef, loading }: CameraBoxProps) {
  return (
    <div className="relative">
      <video ref={videoRef} autoPlay muted width={400} height={300} className="rounded-2xl shadow-2xl w-[400px] h-[300px] border-4 border-blue-500 bg-black object-cover transition-all duration-300" />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl">
          <svg className="animate-spin h-12 w-12 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
        </div>
      )}
      <canvas ref={canvasRef} width={400} height={300} hidden />
    </div>
  );
}
