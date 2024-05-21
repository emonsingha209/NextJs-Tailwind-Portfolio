export async function GET() {
  try {
    const res = await fetch(
      "https://spotify-github-profile.vercel.app/api/view?uid=31gzuyg6pmldhpme7zik3oi6y4sa&cover_image=true&theme=novatorem&show_offline=true&bar_color=53b14f&bar_color_cover=false",
      { cache: "no-store" }
    );
    const data = await res.text();

    return new Response(data, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("Error fetching Spotify profile:", error);
    return new Response("Failed to fetch Spotify profile", {
      status: 500,
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  }
}
export const revalidate = 0;
