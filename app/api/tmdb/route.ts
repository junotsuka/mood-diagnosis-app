import { type NextRequest, NextResponse } from "next/server"
import { searchTMDBContent, getTMDBImageUrl, getNoImageUrl } from "@/utils/tmdb"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("q")

  if (!query) {
    return NextResponse.json({ error: "Missing query parameter" }, { status: 400 })
  }

  try {
    const results = await searchTMDBContent(query)

    if (results.length === 0) {
      return NextResponse.json({
        title: query,
        thumbnail: getNoImageUrl(),
        found: false,
      })
    }

    // 最初の結果を使用
    const movie = results[0]
    const thumbnail = getTMDBImageUrl(movie.poster_path) || getNoImageUrl()

    return NextResponse.json({
      title: movie.title,
      thumbnail,
      found: true,
      tmdbId: movie.id,
      overview: movie.overview,
      releaseDate: movie.release_date,
    })
  } catch (error) {
    console.error("TMDB API Error:", error)
    return NextResponse.json(
      {
        title: query,
        thumbnail: getNoImageUrl(),
        found: false,
        error: "Failed to fetch from TMDB",
      },
      { status: 500 },
    )
  }
}
