import { brandIcon } from "@/lib/brand-icon";

export const dynamic = "force-static";

const sizes = {
  192: 192,
  512: 512,
};

export function generateStaticParams() {
  return Object.keys(sizes).map((size) => ({ size }));
}

export function GET(_request, { params }) {
  const size = sizes[params.size];
  if (!size) return new Response("Not found", { status: 404 });
  return brandIcon(size);
}
