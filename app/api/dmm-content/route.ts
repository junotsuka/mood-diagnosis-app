import { type NextRequest, NextResponse } from "next/server"
import { searchDMMContent, validateDMMLink } from "@/utils/dmm-scraper"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("q")
  const validateUrl = searchParams.get("validate")

  try {
    if (validateUrl) {
      // リンクの有効性をチェック
      const isValid = await validateDMMLink(validateUrl)
      return NextResponse.json({ isValid })
    }

    if (query) {
      // コンテンツを検索
      const contents = await searchDMMContent(query)
      return NextResponse.json({ contents })
    }

    return NextResponse.json({ error: "Missing query parameter" }, { status: 400 })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        isValid: false,
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { titles } = await request.json()

    if (!Array.isArray(titles)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 })
    }

    // 複数の作品を一括で検索・検証
    const results = await Promise.all(
      titles.map(async (title: string) => {
        try {
          const contents = await searchDMMContent(title)
          return {
            title,
            contents: contents.filter((content) => content.isAvailable),
          }
        } catch (error) {
          console.error(`Error searching for ${title}:`, error)
          return {
            title,
            contents: [],
          }
        }
      }),
    )

    return NextResponse.json({ results })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        results: [],
      },
      { status: 500 },
    )
  }
}
