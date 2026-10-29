import Link from "next/link";

export const metadata = {
  title: "Page not found",
  description: "That page is not on Emon Singha's portfolio.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="container py-24">
      <p className="font-oswald text-sm uppercase tracking-[0.08em] text-muted-foreground">
        404
      </p>
      <h1 className="mt-4 font-playfair text-5xl italic leading-none text-foreground">
        Page not found
      </h1>
      <p className="mt-4 max-w-[68ch] text-base leading-7 text-foreground">
        That address is not part of this site.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex min-h-12 items-center font-oswald text-sm uppercase tracking-[0.08em] text-foreground underline-offset-4 hover:underline"
      >
        Back to home
      </Link>
    </main>
  );
}
