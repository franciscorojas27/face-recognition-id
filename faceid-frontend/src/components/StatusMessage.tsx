interface StatusMessageProps {
  status: string;
}

export function StatusMessage({ status }: StatusMessageProps) {
  return (
    <div className="w-full flex flex-col items-center min-h-[36px]">
      {status.startsWith('✅') && (
        <div className="flex items-center gap-2 text-green-400 text-xl font-semibold mb-2">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          <span>{status.replace('✅', '')}</span>
        </div>
      )}
      {status.startsWith('❌') && (
        <div className="flex items-center gap-2 text-red-400 text-xl font-semibold mb-2">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          <span>{status.replace('❌', '')}</span>
        </div>
      )}
      {status.startsWith('⚠️') && (
        <div className="flex items-center gap-2 text-yellow-400 text-xl font-semibold mb-2">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z" /></svg>
          <span>{status.replace('⚠️', '')}</span>
        </div>
      )}
      {!status.startsWith('✅') && !status.startsWith('❌') && !status.startsWith('⚠️') && (
        <span className="text-blue-300 text-xl font-semibold mb-2">{status}</span>
      )}
    </div>
  );
}
