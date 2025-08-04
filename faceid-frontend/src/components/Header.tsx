export function Header() {
  return (
    <header className="flex flex-col items-center mb-10">
      <div className="flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
        <h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow">FaceID App</h1>
      </div>
      <p className="text-gray-400 mt-2 text-center max-w-md">Verifica o registra tu rostro de forma rápida y segura.</p>
    </header>
  );
}
