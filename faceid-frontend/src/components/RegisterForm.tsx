interface RegisterFormProps {
  name: string;
  loading: boolean;
  verifying: boolean;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function RegisterForm({ name, loading, verifying, onNameChange, onSubmit }: RegisterFormProps) {
  return (
    <form
      className="flex flex-col items-center gap-4 w-full mt-8"
      onSubmit={onSubmit}
    >
      <input
        type="text"
        placeholder="Nombre para registro"
        value={name}
        onChange={onNameChange}
        className="px-5 py-3 rounded-xl bg-gray-900 border-2 border-blue-700 text-white w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg shadow transition"
        autoComplete="off"
        disabled={loading || verifying}
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-yellow-400 to-yellow-300 hover:from-yellow-500 hover:to-yellow-400 text-gray-900 px-8 py-3 rounded-xl shadow-xl font-bold text-xl transition transform hover:scale-105 active:scale-95 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        disabled={loading || verifying || !name}
      >
        {loading ? (
          <svg className="animate-spin h-6 w-6 mr-2 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
        ) : 'Registrar rostro'}
      </button>
    </form>
  );
}
