export default function LoadingSpinner({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full py-20">
      <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-4" />
      <span className="text-green-700 font-medium">{label}</span>
    </div>
  );
}
