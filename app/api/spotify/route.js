let cachedData = ""; // to store the fetched data

async function fetchData() {
  try {
    const res = await fetch(
      "https://spotify-github-profile.vercel.app/api/view?uid=31gzuyg6pmldhpme7zik3oi6y4sa&cover_image=true&theme=novatorem&show_offline=true&bar_color=53b14f&bar_color_cover=false",
      { cache: "no-store" }
    );
    const data = await res.text();
    cachedData = data;
  } catch (error) {
    console.error("Error fetching Spotify profile:", error);
  }
}

export async function GET() {
  await fetchData();

  const intervalId = setInterval(fetchData, 3000);

  const cleanup = () => clearInterval(intervalId);

  return new Response(cachedData, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}

export const revalidate = 0;
