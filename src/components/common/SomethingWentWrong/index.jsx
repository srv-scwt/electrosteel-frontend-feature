"use client";

import { useRouter } from "next/navigation";

import { startRouteProgress } from "@/components/common/RouteProgressBar";

export default function SomethingWentWrong({
  title = "Something went wrong",
  message = "We couldn’t process your request right now. Please try again later.",
  showRetry = true,
  errorCode = "API_FAILED",
  onRetry,
}) {
  const router = useRouter();

  // Error boundaries pass Next's `reset`, which re-renders the segment without a
  // full page load. Fall back to a reload when used as a plain "API is down" card.
  const handleRetry = onRetry ?? (() => window.location.reload());

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0c5894] via-[#0a4c80] to-[#083b66] px-4">
      <div className="relative max-w-xl w-full rounded-3xl overflow-hidden bg-white/95 shadow-[0_30px_80px_rgba(12,88,148,0.35)]">

        {/* 🔷 Top Accent */}
        <div className="absolute inset-x-0 top-0 h-1 bg-[#0c5894]" />

        {/* 🖼️ Illustration */}
        <div className="relative h-48 bg-linear-to-br from-[#0c5894] to-[#083b66] flex items-center justify-center">
          <div className="relative z-10 flex flex-col items-center text-white">
            <div className="h-14 w-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-3xl">
              ⚠️
            </div>
            <p className="mt-3 text-sm tracking-wide opacity-90">
              An unexpected error occurred
            </p>
          </div>
        </div>

        {/* 📄 Content */}
        <div className="px-6 sm:px-8 py-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#0c5894]">
            {title}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-600">
            {message}
          </p>

          {/* 🔘 Actions */}
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            {showRetry && (
              <button
                onClick={handleRetry}
                className="inline-flex items-center justify-center rounded-xl bg-[#0c5894] hover:bg-[#094a7b] text-white px-6 py-3 text-sm font-medium shadow-lg shadow-[#0c5894]/30 transition-all active:scale-95"
              >
                Try Again
              </button>
            )}

            <button
              onClick={() => {
                startRouteProgress();
                router.push("/");
              }}
              className="inline-flex items-center justify-center rounded-xl border border-[#0c5894]/30 text-[#0c5894] hover:bg-[#0c5894]/10 px-6 py-3 text-sm font-medium transition-all active:scale-95"
            >
              Go to Home
            </button>
          </div>

          {/* 🧾 Error Code */}
          <div className="mt-6 flex justify-center">
            <span className="rounded-full bg-slate-100 px-4 py-1 text-xs text-slate-500">
              Error Code: <strong className="text-slate-700">{errorCode}</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
