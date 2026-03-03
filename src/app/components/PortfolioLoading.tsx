export function PortfolioLoading() {
  return (
    <div className="relative z-20 min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-xl">
        <div className="relative rounded-3xl border border-white/15 bg-black/45 backdrop-blur-xl p-8 md:p-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/10 to-transparent animate-[shimmer_2s_linear_infinite]" />

          <div className="relative">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse" />
              <p className="text-xs tracking-[0.3em] uppercase text-purple-300">Loading Portfolio</p>
            </div>

            <div className="space-y-4">
              <div className="h-8 w-4/5 rounded-lg bg-white/10 animate-pulse" />
              <div className="h-8 w-3/5 rounded-lg bg-white/10 animate-pulse [animation-delay:120ms]" />
              <div className="h-4 w-full rounded-md bg-white/10 animate-pulse [animation-delay:200ms]" />
              <div className="h-4 w-11/12 rounded-md bg-white/10 animate-pulse [animation-delay:260ms]" />
              <div className="h-4 w-2/3 rounded-md bg-white/10 animate-pulse [animation-delay:320ms]" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(120%); }
        }
      `}</style>
    </div>
  );
}
