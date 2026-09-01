import styles from "@/app/common.module.css";

/**
 * Placeholder shown while a route's data is being fetched on the server.
 *
 * Nearly every public page is a HeroSection followed by a container of
 * content, so the shape below mirrors that: matching the hero's responsive
 * heights keeps the real page from jumping when it swaps in.
 */
export default function PageSkeleton({ cards = 6 }) {
  return (
    <div aria-busy="true" aria-live="polite" className="animate-pulse">
      <span className="sr-only">Loading page…</span>

      {/* Hero — same heights as components/common/heroSection */}
      <section className="relative w-full h-[250px] sm:h-[320px] md:h-[420px] lg:h-[480px] bg-gray-200">
        <div className="absolute bottom-0 left-0 w-full flex items-end">
          <div className="relative bg-white w-full md:w-[55%] lg:w-[45%] px-6 py-8 md:px-10 md:py-10">
            <div className="h-8 md:h-10 w-2/3 rounded bg-gray-200 mb-4" />
            <div className="h-4 w-1/2 rounded bg-gray-200" />
          </div>
        </div>
      </section>

      <section>
        <div className={styles.containerLg}>
          {/* Section heading + optional filter control */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
            <div className="h-7 md:h-9 w-64 max-w-full rounded bg-gray-200" />
            <div className="h-11 w-full sm:w-[220px] rounded-md bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 xl:gap-6">
            {Array.from({ length: cards }).map((_, index) => (
              <div
                key={index}
                className="h-[150px] rounded-[12px] bg-gray-200"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
