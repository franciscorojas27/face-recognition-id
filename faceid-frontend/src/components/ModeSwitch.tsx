interface ModeSwitchProps {
  registerMode: boolean;
  loading: boolean;
  verifying: boolean;
  onToggle: () => void;
}

export function ModeSwitch({ registerMode, loading, verifying, onToggle }: ModeSwitchProps) {
  return (
    <div className="flex items-center gap-2 mb-6">
      <span className={`px-4 py-1 rounded-full text-base font-bold shadow-lg tracking-wide ${registerMode ? 'bg-yellow-400 text-gray-900' : 'bg-blue-600 text-white'}`}
      >
        {registerMode ? '📝 Modo registro' : '🔍 Modo verificación'}
      </span>
      <button
        className={`ml-2 px-4 py-1 rounded-full font-bold border-2 transition text-base shadow ${registerMode ? 'border-yellow-400 text-yellow-700 hover:bg-yellow-400/80' : 'border-blue-400 text-blue-300 hover:bg-blue-600/80'}`}
        onClick={onToggle}
        disabled={loading || verifying}
        title={registerMode ? 'Cambiar a verificación' : 'Cambiar a registro'}
      >
        {registerMode ? '🔄 Verificar' : '📝 Registrar'}
      </button>
    </div>
  );
}
