export interface TMDBMovie {
  id: number
  title: string
  poster_path: string | null
  backdrop_path: string | null
  overview: string
  release_date: string
}

export interface TMDBSearchResponse {
  results: TMDBMovie[]
  total_results: number
}

const TMDB_BASE_URL = "https://api.themoviedb.org/3"
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p"

export async function searchTMDBContent(query: string): Promise<TMDBMovie[]> {
  try {
    const apiKey = process.env.TMDB_API_KEY
    if (!apiKey) {
      console.error("TMDB API key not found")
      return []
    }

    const response = await fetch(
      `${TMDB_BASE_URL}/search/multi?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=ja-JP`,
    )

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`)
    }

    const data: TMDBSearchResponse = await response.json()
    return data.results || []
  } catch (error) {
    console.error("TMDB search failed:", error)
    return []
  }
}

export function getTMDBImageUrl(path: string | null, size: "w300" | "w500" | "original" = "w500"): string | null {
  if (!path) return null
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`
}

export function getNoImageUrl(): string {
  return "/placeholder.svg?height=750&width=500&text=NO+IMAGE"
}
