export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center animate-fade-in">
      <div className="relative mb-6">
        {/* Spinner ring */}
        <div className="w-14 h-14 rounded-full border-[3px] border-stone-100 border-t-[#c2703e] animate-spin" />
        {/* Center brand mark */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-serif text-sm text-[#c2703e] font-bold">Y</span>
        </div>
      </div>
      <p className="text-[13px] font-semibold text-stone-400 uppercase tracking-widest animate-pulse">Loading</p>
    </div>
  );
}
