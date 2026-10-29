export default function Loading() {
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      className="container flex min-h-[calc(100svh-7.5rem)] flex-col-reverse items-center justify-center gap-10 py-12 md:min-h-[calc(100svh-4rem)] md:flex-row md:gap-8 md:py-0"
    >
      <p className="sr-only">Loading</p>
      <div className="flex w-full flex-col gap-5 md:w-7/12 lg:w-2/3">
        <div className="h-12 w-[12ch] max-w-full bg-foreground/10 motion-safe:animate-pulse md:h-[4.5rem]" />
        <div className="h-8 w-[18ch] max-w-full border-b border-border bg-foreground/10 motion-safe:animate-pulse" />
        <div className="flex max-w-[68ch] flex-col gap-2">
          <div className="h-3 w-full bg-foreground/10 motion-safe:animate-pulse" />
          <div className="h-3 w-11/12 bg-foreground/10 motion-safe:animate-pulse" />
          <div className="h-3 w-3/4 bg-foreground/10 motion-safe:animate-pulse" />
        </div>
        <div className="h-3 w-40 bg-foreground/10 motion-safe:animate-pulse" />
        <div className="flex flex-col gap-3 xns:flex-row">
          <div className="h-12 w-full bg-navy/80 motion-safe:animate-pulse xns:w-28 dark:bg-signal/70" />
          <div className="h-12 w-full border border-navy/40 xns:w-32 dark:border-paper/40" />
          <div className="h-12 w-full xns:w-36" />
        </div>
      </div>
      <div className="w-full min-w-0 max-w-sm md:w-5/12 md:max-w-none lg:w-1/3">
        <div className="grid aspect-square w-full place-items-center rounded-full border border-navy/30 p-11 dark:border-paper/40 md:p-14">
          <div className="aspect-square w-full rounded-full bg-foreground/10 motion-safe:animate-pulse" />
        </div>
      </div>
    </div>
  );
}
