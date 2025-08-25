"use client";

export default function ErrorFallback({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-full py-20 text-center">
      <div className="w-8 h-8 mb-4 text-red-500">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-8 h-8 mx-auto">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
        </svg>
      </div>
      <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
      <p className="mb-4 text-gray-500">{error.message}</p>
      <button onClick={reset} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Try again</button>
    </div>
  );
}
